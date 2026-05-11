from fastapi import FastAPI
import psycopg2
import os
import logging

# Configuração de logs para simular o envio
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

def get_db_connection():
    # Obtém a URL do banco do ambiente (definida no docker-compose)
    return psycopg2.connect(os.getenv("DATABASE_URL"))

@app.get("/notifications/pending")
def get_pending():
    """Consulta usuários com notificationEnabled = true"""
    conn = get_db_connection()
    cur = conn.cursor()
    # Importante: O Prisma cria a tabela como "User" (case sensitive)
    cur.execute('SELECT id, name, email FROM "User" WHERE "notificationEnabled" = True')
    users = cur.fetchall()
    cur.close()
    conn.close()

    return {"pending_users": [{"id": u[0], "name": u[1], "email": u[2]} for u in users]}

@app.post("/notifications/send")
def send_notifications():
    """Simula o envio de notificações e retorna o total"""
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT name FROM "User" WHERE "notificationEnabled" = True')
    users = cur.fetchall()

    total = 0
    for user in users:
        # Simulação via log no console
        logger.info(f"Simulando envio de notificação para: {user[0]}")
        total += 1

    cur.close()
    conn.close()

    return {
        "message": "Notifications sent successfully",
        "total": total
    }