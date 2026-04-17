from __future__ import annotations

import re
from typing import Any, Callable


class AIService:
    """Minimal AI service for the first message -> reply pipeline step."""

    ALLOWED_INTENTS = {
        "product_inquiry",
        "order_request",
        "order_status",
        "complaint",
        "off_topic",
        "escalate",
        "greeting",
        "general_query",
    }

    def __init__(
        self,
        service_name: str = "ai-service",
        intent_llm: Callable[[str], str] | None = None,
        tone: str = "friendly",
        shop_name: str = "our shop",
        products: list[dict[str, Any]] | None = None,
    ) -> None:
        self.service_name = service_name
        if intent_llm is None:
            raise ValueError("intent_llm is required for AIService")
        self.intent_llm = intent_llm
        self.tone = tone.lower()
        self.shop_name = shop_name
        self.product_hints = self._build_product_hints(products or [])

    def configure_shop(self, shop_name: str, products: list[dict[str, Any]]) -> None:
        """Update service context so replies are grounded in a specific shop catalog."""
        self.shop_name = shop_name
        self.product_hints = self._build_product_hints(products)

    def _build_product_hints(self, products: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
        """Build keyword->product mapping from a shop catalog."""
        hints: dict[str, dict[str, Any]] = {}
        for prod in products:
            name = str(prod.get("name", "")).strip()
            if not name:
                continue

            info = {
                "name": name,
                "price": f"{prod.get('price', 'N/A')} BDT",
                "stock": prod.get("stock", "N/A"),
                "sizes": ", ".join(prod.get("sizes", [])) if isinstance(prod.get("sizes"), list) else "N/A",
            }

            lowered_name = name.lower()
            hints[lowered_name] = info

            token_candidates = re.split(r"[^a-z0-9]+", lowered_name)
            for token in token_candidates:
                if len(token) >= 4:
                    hints.setdefault(token, info)

        return hints

    def process_message(self, message: str) -> str:
        """Process an incoming user message and return a reply."""
        cleaned_message = message.strip()
        if not cleaned_message:
            return (
                "Ji, bolun. Ki help lagbe?"
                if self.tone == "friendly"
                else "Apnar message din, ami help korchi."
            )

        context = self.build_context(cleaned_message)
        intent = self.classify_intent(context)
        return self.generate_reply(context, intent)

    def build_context(self, message: str) -> dict[str, Any]:
        """Build minimal context for downstream intent and reply steps."""
        normalized_message = " ".join(message.lower().split())
        return {
            "original_message": message,
            "normalized_message": normalized_message,
            "message_length": len(message),
            "has_question_mark": "?" in message,
        }

    def classify_intent(self, context: dict[str, Any]) -> str:
        """Classify user intent using an LLM prompt and normalize the result."""
        message = context["original_message"]
        product_names = sorted({info["name"] for info in self.product_hints.values()})
        catalog_line = ", ".join(product_names) if product_names else "N/A"
        prompt = (
            "Classify the message into exactly one label: product_inquiry, order_request, order_status, complaint, off_topic, escalate, greeting, general_query.\n"
            "Return only the label text.\n"
            f"Shop: {self.shop_name}\n"
            f"Known products: {catalog_line}\n"
            "If user asks price, stock, size, availability, treat as product_inquiry.\n"
            "If user wants to buy/order/confirm quantity, treat as order_request.\n"
            f"Message: {message}\n"
            "Label:"
        )

        try:
            raw_intent = self.intent_llm(prompt)
            normalized_intent = self._normalize_intent_label(raw_intent)
            if normalized_intent in self.ALLOWED_INTENTS:
                return normalized_intent
            return "general_query"
        except Exception as e:
            raise RuntimeError(f"Intent LLM failed: {e}") from e

    def _normalize_intent_label(self, raw_intent: str) -> str:
        """Normalize LLM output into a clean intent label."""
        text = raw_intent.strip().lower()
        text = text.replace("-", "_")
        text = re.sub(r"\s+", "_", text)
        text = re.sub(r"[^a-z_]", "", text)

        for allowed in self.ALLOWED_INTENTS:
            if allowed in text:
                return allowed

        compact_text = text.replace("_", "")
        for allowed in self.ALLOWED_INTENTS:
            if allowed.replace("_", "") in compact_text:
                return allowed

        return text

    def generate_reply(self, context: dict[str, Any], intent: str) -> str:
        """Generate a short reply based on classified intent."""
        normalized_message = context["normalized_message"]
        product_info = self._find_product_hint(normalized_message)
        product_name = product_info["name"] if product_info else None
        product_price = product_info["price"] if product_info else None
        product_stock = product_info["stock"] if product_info else None
        product_sizes = product_info["sizes"] if product_info else None

        if intent == "order_request":
            if product_name:
                if self.tone == "formal":
                    return (
                        f"Ji, {product_name} order kora jabe.\n"
                        f"Price: {product_price} | Stock: {product_stock}\n"
                        f"Available sizes: {product_sizes}\n"
                        "Please share quantity, size/variant, and full address."
                    )
                return (
                    f"Darun choice! {product_name} order korte parben.\n"
                    f"Price: {product_price} | Stock: {product_stock}\n"
                    f"Sizes: {product_sizes}\n"
                    "Qty, size ar full address din, ami confirm kore dibo."
                )
            if self.tone == "formal":
                return (
                    "Order confirm korte product name, quantity, size/variant, "
                    "and delivery address din."
                )
            return "Order korte product name, qty, size ar full address din."

        if intent == "product_inquiry":
            if product_name:
                if self.tone == "formal":
                    return (
                        f"Ji, {product_name} {self.shop_name}-e available ache.\n"
                        f"Price: {product_price}\n"
                        f"Stock: {product_stock} | Sizes: {product_sizes}\n"
                        "Apnar preferred size/quantity bolben?"
                    )
                return (
                    f"Ji, {product_name} available.\n"
                    f"Price: {product_price}\n"
                    f"Stock: {product_stock} | Sizes: {product_sizes}\n"
                    "Kon size ar koyta niben bolun."
                )
            if self.tone == "formal":
                return "Product name din, ami price, stock, ar available sizes check kore janacchi."
            return "Product name ta bolun, ami price, stock ar sizes check kore dichchi."

        if intent == "order_status":
            if self.tone == "formal":
                return "Order status check korte order ID ba order-e use kora phone number din."
            return "Order status dekhte order ID ba order e je phone number disilen, ota din please."

        if intent == "complaint":
            if self.tone == "formal":
                return "Dukkho pelam. Order ID ar issue ta short e din, ami promptly check korchi."
            return "Khub dukkho pelam. Order ID ar issue ta short e bolun, ami sathe sathe check korchi."

        if intent == "escalate":
            if self.tone == "formal":
                return "Ji, apnake human support team-er sathe connect kora hocche. Number din."
            return "Thik ache, human support e connect kori. Apnar number ta din."

        if intent == "greeting":
            if self.tone == "formal":
                return f"Assalamu alaikum. {self.shop_name}-e apni kon product khujchen bolben?"
            return f"Assalamu alaikum. Welcome to {self.shop_name}. Ki product lagbe bolun?"

        if self.tone == "formal":
            return (
                "Ji bolun, kon product dorkar? Product name dile ami "
                "price, stock ar size details sathe sathe janabo."
            )
        return "Ji bolun, ki nite chan? Product name dile details diye help korte parbo."

    def _find_product_hint(self, normalized_message: str) -> dict[str, Any] | None:
        """Find best matching product details from message text."""
        for keyword, product in sorted(self.product_hints.items(), key=lambda item: len(item[0]), reverse=True):
            if keyword in normalized_message:
                return product
        return None
