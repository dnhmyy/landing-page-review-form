# Panduan Pemeliharaan VPS & Docker

Dokumen ini berisi langkah-langkah untuk membersihkan ruang penyimpanan dan menjaga agar VPS tidak cepat penuh.

## 1. Cek Penggunaan Penyimpanan
Gunakan perintah ini untuk melihat folder mana yang paling besar:
```bash
# Cek sisa space disk
df -h

# Cek folder mana yang paling berat di direktori aktif
du -sh * | sort -hr
```

## 2. Pembersihan Docker

### Perintah "Sapu Bersih" (Rekomendasi)
Hapus semua resource Docker yang tidak terpakai (image yang tidak terpakai, container yang sudah stop, network, dan cache build):
```bash
docker system prune -a --volumes
```
> [!WARNING]
> Perintah ini akan menghapus semua image yang tidak sedang dipakai oleh container aktif. Pastikan Anda sudah mem-build container yang diperlukan sebelum menjalankan ini.

### Perintah Spesifik
Jika ingin lebih spesifik:
- **Hapus Image lama:** `docker image prune -a`
- **Hapus Volume lama:** `docker volume prune`
- **Hapus Cache Build:** `docker builder prune -a`

## 3. Batasi Log Docker (Sudah Diterapkan)
Saya sudah menambahkan konfigurasi berikut di `docker-compose.yml` untuk membatasi log:
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```
Ini akan memastikan log setiap container tidak pernah melebihi 30MB (3 file @ 10MB).

## 4. Tips Tambahan
- **Hapus Folder `.next`:** Folder ini bisa membengkak saat build. Jika Anda melakukan build di luar Docker, sering-seringlah hapus `.next` yang lama.
- **Node Modules:** Periksa folder `node_modules`. Jika ada proyek lama yang tidak terpakai, sebaiknya dihapus.
