from telebot import TeleBot
from logging import getLogger
from datetime import datetime

from backend.call_application_bot_configs import TOKEN, CHAT_ID


class CallApplicationBot:

    def __init__(self, name: str, phone: int, call_date: str) -> None:
        self.__bot = TeleBot(token=TOKEN, parse_mode='HTML')
        self.__logger = getLogger('call-bot-logger')
        self.__name = name
        self.__phone = phone
        self.__call_date = call_date

    def send_notification(self) -> bool:
        try:
            self.__bot.send_message(
                chat_id=CHAT_ID,
                text=self.__get_template(),
                parse_mode='HTML'
            )
            return True
        except Exception as e:
            self.__logger.error(e)
            return False

    def __get_template(self) -> str:
        template = f"Новая заявка на звонок:\n\n" \
                   f"Имя: {self.__name}\n" \
                   f"Телефон: {self.__phone}\n" \
                   f"Желаемая дата звонка: {self.__parse_call_date()}"
        return template

    def __parse_call_date(self) -> str:
        date, time = self.__call_date.split(' ')
        date_with_changed_format = datetime.strptime(date, '%Y-%m-%d').strftime('%d-%m-%Y')
        parsed_date = f"{date_with_changed_format} в {time}"
        return parsed_date
