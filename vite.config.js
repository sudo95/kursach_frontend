import { resolve } from 'path';
import { cpSync } from 'fs';
import { defineConfig } from 'vite';

const base = process.env.VITE_BASE_PATH || '/';

function copyDataPlugin() {
  return {
    name: 'copy-data',
    closeBundle() {
      cpSync(resolve(__dirname, 'src/data'), resolve(__dirname, 'dist/data'), {
        recursive: true,
      });
    },
  };
}

export default defineConfig({
  base,
  root: 'src',
  plugins: [copyDataPlugin()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        courses: resolve(__dirname, 'src/pages/courses.html'),
        course: resolve(__dirname, 'src/pages/course.html'),
        achievements: resolve(__dirname, 'src/pages/achievements.html'),
        profile: resolve(__dirname, 'src/pages/profile.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
