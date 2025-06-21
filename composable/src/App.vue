<template>
  <div class="container">
    <h1 class="title">📝 Mini Blog</h1>

    <div class="card form-card">
      <h2>Tambah Post</h2>
      <form @submit.prevent="addPost">
        <input v-model="newPost.title" placeholder="Judul artikel..." required />
        <textarea v-model="newPost.body" placeholder="Isi konten..." required></textarea>
        <button type="submit">+ Simpan Post</button>
      </form>
    </div>

    <h2 class="section-title">📚 Semua Post</h2>

    <div class="posts">
      <div class="card post-card" v-for="post in posts" :key="post.id">
        <div class="post-header">
          <strong>{{ post.title }}</strong>
          <button @click="deletePost(post.id)">🗑</button>
        </div>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PostApp',
  data() {
    return {
      posts: [],
      newPost: {
        title: '',
        body: ''
      }
    }
  },
  mounted() {
    this.loadPosts()
  },
  methods: {
    async loadPosts() {
      try {
        const response = await axios.get('http://localhost:3001/posts')
        this.posts = response.data
      } catch (error) {
        console.error('Gagal mengambil data', error)
      }
    },
    async addPost() {
      try {
        await axios.post('http://localhost:3001/posts', this.newPost)
        this.newPost.title = ''
        this.newPost.body = ''
        this.loadPosts()
      } catch (error) {
        console.error('Gagal menambahkan post', error)
      }
    },
    async deletePost(id) {
      if (confirm('Yakin hapus post ini?')) {
        try {
          await axios.delete(`http://localhost:3001/posts/${id}`)
          this.loadPosts()
        } catch (error) {
          console.error('Gagal menghapus post', error)
        }
      }
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f2f5;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}

.section-title {
  margin-top: 40px;
  margin-bottom: 20px;
  color: #34495e;
  font-size: 1.4rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
}

.form-card form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-card input,
.form-card textarea {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
}

.form-card button {
  align-self: flex-start;
  padding: 10px 18px;
  background-color: #27ae60;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-card button:hover {
  background-color: #219150;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  border-left: 5px solid #2ecc71;
  padding: 16px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.post-header button {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #e74c3c;
}

.post-header button:hover {
  color: #c0392b;
}
</style>
