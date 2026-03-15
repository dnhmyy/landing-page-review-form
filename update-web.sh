#!/bin/bash
echo "Menarik update terbaru dari Git..."
git pull origin main

echo "Memulai build ulang container Docker (hanya service app)..."
docker compose up -d --build app

echo "Membersihkan cache Docker..."
docker image prune -f
docker builder prune -f

echo "Selesai! Silakan cek web kamu."