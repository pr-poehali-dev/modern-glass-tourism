"""Загружает SVG файл по URL и возвращает его содержимое частями"""
import json
import re
import urllib.request


def handler(event, context):
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    params = event.get('queryStringParameters') or {}
    url = params.get('url', '')
    mode = params.get('mode', 'chunk')
    part = params.get('part', '1')

    if not url:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'url parameter required'}),
        }

    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=10) as resp:
        content = resp.read().decode('utf-8')

    if mode == 'paths':
        paths = re.findall(r'd="([^"]*)"', content)
        idx = int(part) - 1
        if 0 <= idx < len(paths):
            p = paths[idx]
            return {
                'statusCode': 200,
                'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                'body': json.dumps({'index': idx, 'total': len(paths), 'length': len(p), 'path': p}),
            }
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'total': len(paths), 'lengths': [len(p) for p in paths]}),
        }

    chunk_size = 800
    total = len(content)
    total_parts = (total + chunk_size - 1) // chunk_size
    part_num = int(part)
    start = (part_num - 1) * chunk_size
    end = min(start + chunk_size, total)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'part': part_num, 'total_parts': total_parts, 'total_length': total, 'content': content[start:end]}),
    }
