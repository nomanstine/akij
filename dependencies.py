from __future__ import annotations

from dataclasses import dataclass
from typing import Callable

from ai_service import AIService
from gemini_client import create_gemini_intent_classifier
from ollama_client import OllamaClient, create_ollama_intent_classifier

IntentClassifier = Callable[[str], str]


@dataclass
class ProviderConfig:
    provider: str = "gemini"
    tone: str = "friendly"


class ServiceContainer:
    """Minimal dependency injection container for AIService."""

    def __init__(self, config: ProviderConfig) -> None:
        self.config = config

    def intent_classifier(self) -> IntentClassifier:
        provider = self.config.provider.lower()

        if provider == "gemini":
            return create_gemini_intent_classifier()
        if provider == "ollama":
            # Use a lightweight server readiness check instead of a full model generation probe.
            client = OllamaClient()
            if client.is_available():
                return create_ollama_intent_classifier()
            raise RuntimeError("Ollama server unavailable")

        raise ValueError("Unsupported provider. Use one of: gemini, ollama")

    def ai_service(self) -> AIService:
        classifier = self.intent_classifier()
        return AIService(
            service_name=f"{self.config.provider}-ai",
            intent_llm=classifier,
            tone=self.config.tone,
        )
