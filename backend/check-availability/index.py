import json
import os
import psycopg2
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''Проверка доступности номеров на заданные даты'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}, ensure_ascii=False),
            'isBase64Encoded': False
        }

    body = json.loads(event.get('body', '{}'))
    room_type = body.get('room_type', '').strip()
    check_in = body.get('check_in_date', '').strip()
    check_out = body.get('check_out_date', '').strip()

    if not all([room_type, check_in, check_out]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}, ensure_ascii=False),
            'isBase64Encoded': False
        }

    if room_type not in ['Комфорт', 'Премиум']:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid room type'}, ensure_ascii=False),
            'isBase64Encoded': False
        }

    try:
        datetime.fromisoformat(check_in)
        datetime.fromisoformat(check_out)
    except ValueError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid date format'}, ensure_ascii=False),
            'isBase64Encoded': False
        }

    dsn = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    cur.execute("""
        SELECT COUNT(*) 
        FROM bookings 
        WHERE room_type = %s 
        AND status IN ('pending', 'confirmed')
        AND (
            (check_in_date <= %s AND check_out_date > %s) OR
            (check_in_date < %s AND check_out_date >= %s) OR
            (check_in_date >= %s AND check_out_date <= %s)
        )
    """, (room_type, check_in, check_in, check_out, check_out, check_in, check_out))

    booked_count = cur.fetchone()[0]
    
    cur.close()
    conn.close()

    max_rooms = 6 if room_type == 'Комфорт' else 2
    available_count = max_rooms - booked_count
    is_available = available_count > 0

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'available': is_available,
            'available_count': available_count,
            'max_rooms': max_rooms,
            'booked_count': booked_count
        }, ensure_ascii=False),
        'isBase64Encoded': False
    }
