# actions.py

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionTanyaWaktu(Action):
    def name(self) -> Text:
        return "action_tanya_waktu"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        from datetime import datetime
        now = datetime.now()
        waktu = now.strftime("%H:%M")
        dispatcher.utter_message(text=f"Sekarang jam {waktu}.")
        return []
