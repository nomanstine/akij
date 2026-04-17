"""Google Gemini LLM client for intent classification and reply generation."""

from __future__ import annotations

import os

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()


class GeminiClient:
    """Wrapper around Google Gemini API for commerce AI tasks."""

    def __init__(self, api_key: str | None = None, model_name: str = "gemini-2.5-flash") -> None:
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        self.model_name = model_name

        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not provided and not found in environment.")

        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(self.model_name)

    def list_available_models(self) -> list[str]:
        """List all available models for debugging."""
        try:
            models = genai.list_models()
            return [m.name for m in models]
        except Exception as e:
            return [f"Error listing models: {e}"]

    def classify_intent(self, prompt: str) -> str:
        """Call Gemini to classify intent from a prompt."""
        try:
            response = self.model.generate_content(prompt, generation_config=genai.types.GenerationConfig(
                temperature=0.1,
                max_output_tokens=50,
            ))
            
            # Try to extract text from candidates[0].content.parts
            if response.candidates and len(response.candidates) > 0:
                content = response.candidates[0].content
                if content and content.parts and len(content.parts) > 0:
                    return content.parts[0].text
            
            raise RuntimeError(f"No content in response. Finish reason: {response.candidates[0].finish_reason if response.candidates else 'unknown'}")
        except Exception as e:
            raise RuntimeError(f"Gemini intent classification failed: {e}")

    def generate_reply(self, prompt: str) -> str:
        """Call Gemini to generate a reply from a prompt."""
        try:
            response = self.model.generate_content(prompt, generation_config=genai.types.GenerationConfig(
                temperature=0.3,
                max_output_tokens=300,
            ))
            
            # Try to extract text from candidates[0].content.parts
            if response.candidates and len(response.candidates) > 0:
                content = response.candidates[0].content
                if content and content.parts and len(content.parts) > 0:
                    return content.parts[0].text
            
            raise RuntimeError(f"No content in response. Finish reason: {response.candidates[0].finish_reason if response.candidates else 'unknown'}")
        except Exception as e:
            raise RuntimeError(f"Gemini reply generation failed: {e}")


def create_gemini_intent_classifier(api_key: str | None = None) -> callable:
    """Factory function to create an intent classifier bound to Gemini."""
    client = GeminiClient(api_key=api_key)

    def classify(prompt: str) -> str:
        return client.classify_intent(prompt)

    return classify
