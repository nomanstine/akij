"""Test AI pipeline with multiple shop catalogs and user queries."""

from __future__ import annotations

import argparse

from dotenv import load_dotenv

from dependencies import ProviderConfig, ServiceContainer
from data import SHOPS, SHOP_QUERIES

load_dotenv()


def format_products_catalog(shop: dict) -> str:
    """Format products as a readable catalog."""
    lines = [f"\n📦 {shop['name']} Product Catalog:"]
    for prod in shop["products"]:
        lines.append(
            f"  • {prod['name']}: {prod['price']} BDT | Stock: {prod['stock']} | "
            f"Sizes: {', '.join(prod['sizes'])}"
        )
    return "\n".join(lines)


def find_shop_by_id(shop_id: str) -> dict | None:
    """Find a shop dict from configured shops."""
    for shop in SHOPS:
        if shop["id"] == shop_id:
            return shop
    return None


def run_shop_queries(provider: str, shop: dict) -> None:
    """Run all sample queries for a single shop."""
    print("\n" + "=" * 80)
    print(f"🏪 Shop: {shop['name']} (Owner: {shop['owner']}, Platform: {shop['platform']})")
    print(format_products_catalog(shop))
    print("\n" + "-" * 80)

    try:
        container = ServiceContainer(
            ProviderConfig(provider=provider, tone=shop.get("tone", "friendly"))
        )
        service = container.ai_service()
        service.configure_shop(shop_name=shop["name"], products=shop["products"])
        print(f"✓ Injected provider: {provider}")
    except Exception as e:
        print(f"✗ Failed to initialize '{provider}' for shop '{shop['id']}': {e}")
        return

    print(f"Tone: {shop.get('tone', 'friendly')}\n")
    queries = SHOP_QUERIES.get(shop["id"], [])
    for idx, query in enumerate(queries, 1):
        print(f"Q{idx}: {query}")
        reply = service.process_message(query)
        print(f"A{idx}:\n{reply}\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Run multi-shop query pipeline")
    parser.add_argument(
        "--provider",
        choices=["gemini", "ollama"],
        default="ollama",
        help="LLM provider to inject into AIService",
    )
    parser.add_argument(
        "--shop",
        choices=[shop["id"] for shop in SHOPS] + ["all"],
        default="all",
        help="Shop ID to run, or 'all' for all configured shops",
    )
    args = parser.parse_args()

    print("\n" + "=" * 80)
    print("Testing AI Pipeline with Multi-Shop Customer Queries")
    print("=" * 80 + "\n")

    print(f"Using provider: {args.provider}")
    print(f"Target shop: {args.shop}\n")

    if args.shop == "all":
        for shop in SHOPS:
            run_shop_queries(args.provider, shop)
        return

    selected_shop = find_shop_by_id(args.shop)
    if selected_shop is None:
        print(f"✗ Unknown shop id: {args.shop}")
        return

    run_shop_queries(args.provider, selected_shop)


if __name__ == "__main__":
    main()

