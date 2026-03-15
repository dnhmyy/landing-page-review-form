#!/bin/bash
echo "Menarik update terbaru dari Git..."
git pull origin main

echo "Memulai build ulang container Docker (hanya service app)..."
docker compose up -d --build app

echo "Selesai! Silakan cek web kamu."
