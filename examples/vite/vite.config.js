import { telefunc } from 'telefunc/vite'

export default {
  plugins: [telefunc()],
  build: { target: 'esnext' },
}
