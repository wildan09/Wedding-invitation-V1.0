FROM node:lts-alpine

# Set direktori kerja di dalam container
WORKDIR /app

# Copy package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies (akan dilewati jika package.json belum ada)
RUN npm install

# Copy seluruh kode sumber
COPY . .

# Expose port default Vite
EXPOSE 5173

# Jalankan aplikasi (tambahkan --host agar bisa diakses dari luar container)
CMD ["npm", "run", "dev", "--", "--host"]