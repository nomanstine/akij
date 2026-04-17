"""Example: How to wire Gemini LLM client into AIService."""

from __future__ import annotations

from dotenv import load_dotenv

from ai_service import AIService
from gemini_client import create_gemini_intent_classifier

load_dotenv()


def main() -> None:
    # Option: With Real Gemini LLM (when API key is available)
    try:
        print("=== Gemini LLM Mode ===")
        gemini_classifier = create_gemini_intent_classifier()
        service_gemini = AIService(service_name="gemini-ai", intent_llm=gemini_classifier)
        reply = service_gemini.process_message("Do you have this product in blue?")
        print(f"Reply: {reply}\n")
    except ValueError as e:
        print(f"Gemini not configured: {e}\nSkipping Gemini test.")
    except RuntimeError as e:
        print(f"Gemini API error: {e}")
        # List available models for debugging
        try:
            from gemini_client import GeminiClient
            client = GeminiClient()
            available = client.list_available_models()
            print(f"Available models: {available}")
        except Exception:
            pass


if __name__ == "__main__":
    main()
