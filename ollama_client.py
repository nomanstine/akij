"""Local Ollama LLM client for intent classification and reply generation."""

from __future__ import annotations

import json
import subprocess


class OllamaClient:
    """Wrapper around Ollama API running locally for commerce AI tasks."""

    def __init__(
        self,
        model_name: str = "llama2",
        base_url: str = "http://localhost:11434",
        timeout_seconds: int = 120,
    ) -> None:
        self.model_name = model_name
        self.base_url = base_url
        self.timeout_seconds = timeout_seconds

    def _request_generate(self, prompt: str) -> dict:
        """Send generate request and return parsed JSON response."""
        payload = json.dumps(
            {
                "model": self.model_name,
                "prompt": prompt,
                "stream": False,
            }
        )
        response = subprocess.run(
            [
                "curl",
                "-sS",
                "-H",
                "Content-Type: application/json",
                f"{self.base_url}/api/generate",
                "-d",
                payload,
            ],
            capture_output=True,
            text=True,
            timeout=self.timeout_seconds,
        )
        if response.returncode != 0:
            details = (response.stderr or response.stdout).strip()
            if not details:
                details = "Ollama service unreachable or curl execution failed"
            raise RuntimeError(f"Ollama request failed: {details}")

        body = response.stdout.strip()
        if not body:
            raise RuntimeError("Empty HTTP response from Ollama")

        try:
            result = json.loads(body)
        except json.JSONDecodeError as e:
            raise RuntimeError(f"Invalid JSON from Ollama: {body[:200]}") from e

        error = result.get("error")
        if error:
            raise RuntimeError(f"Ollama API error: {error}")

        return result

    def is_available(self) -> bool:
        """Check whether local Ollama server is reachable."""
        response = subprocess.run(
            ["curl", "-sS", f"{self.base_url}/api/tags"],
            capture_output=True,
            text=True,
            timeout=10,
        )
        return response.returncode == 0

    def classify_intent(self, prompt: str) -> str:
        """Call Ollama to classify intent from a prompt."""
        try:
            result = self._request_generate(prompt)
            text = result.get("response", "").strip()
            if text:
                return text
            raise RuntimeError("Empty response from Ollama")
        except Exception as e:
            raise RuntimeError(f"Ollama intent classification failed: {e}")

    def generate_reply(self, prompt: str) -> str:
        """Call Ollama to generate a reply from a prompt."""
        try:
            result = self._request_generate(prompt)
            text = result.get("response", "").strip()
            if text:
                return text
            raise RuntimeError("Empty response from Ollama")
        except Exception as e:
            raise RuntimeError(f"Ollama reply generation failed: {e}")


def create_ollama_intent_classifier(model_name: str = "llama2") -> callable:
    """Factory function to create an intent classifier bound to Ollama."""
    client = OllamaClient(model_name=model_name)

    def classify(prompt: str) -> str:
        return client.classify_intent(prompt)

    return classify
