// BookList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import { BookOpenIcon, LogoutIcon } from '@heroicons/react/outline';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🧩 ดึงข้อมูลจาก API
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/v1/books');
      if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลได้');
      }

      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 ค้นหาหนังสือ
  const handleSearch = (searchTerm) => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.isbn && book.isbn.includes(searchTerm))
    );
    setFilteredBooks(filtered);
  };

  // ✏️ แก้ไข
  const handleEdit = (bookId) => {
    navigate(`/store-manager/edit-book/${bookId}`);
  };

  // 🗑️ ลบ
  const handleDelete = async (book) => {
    if (window.confirm(`คุณต้องการลบหนังสือ "${book.title}" ใช่หรือไม่?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/books/${book.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('ไม่สามารถลบหนังสือได้');

        setBooks(books.filter(b => b.id !== book.id));
        setFilteredBooks(filteredBooks.filter(b => b.id !== book.id));
        alert('ลบหนังสือเรียบร้อยแล้ว!');
      } catch (err) {
        alert('เกิดข้อผิดพลาด: ' + err.message);
        console.error('Error deleting book:', err);
      }
    }
  };

  // ➕ เพิ่มหนังสือ
  const handleAddBook = () => {
    navigate('/store-manager/add-book');
  };

  // 🚪 ออกจากระบบ
  const handleLogout = () => {
    if (window.confirm('ต้องการออกจากระบบใช่หรือไม่?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">❌ เกิดข้อผิดพลาด: {error}</p>
          <button 
            onClick={fetchBooks}
            className="px-6 py-2 bg-viridian-600 text-white rounded-lg hover:bg-viridian-700"
          >
            ลองอีกครั้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-r from-indigo-700 to-rose-100">

      {/* ✅ Header ใหม่ */}
      <header className="bg-white/10 backdrop-blur-md text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <BookOpenIcon className="h-8 w-8" />
              <h1 className="text-2xl font-bold">BookStore - BackOffice</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30
                rounded-lg transition-colors"
            >
              <LogoutIcon className="h-5 w-5" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </header>

      {/* ✅ เนื้อหา */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-viridian-600 to-green-600 text-white p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">📚 จัดการหนังสือ</h1>
                <button
                  onClick={handleAddBook}
                  className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  ➕ เพิ่มหนังสือใหม่
                </button>
              </div>
            </div>

            {/* Search & Count */}
            <div className="p-6 border-b">
              <div className="mb-4">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="text-gray-600">
                จำนวนหนังสือทั้งหมด:{' '}
                <span className="text-viridian-600 font-bold text-xl">
                  {filteredBooks.length}
                </span>{' '}
                เล่ม
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-viridian-600 to-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ชื่อหนังสือ</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ผู้แต่ง</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ISBN</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ปีที่พิมพ์</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ราคา (฿)</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBooks.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        ไม่พบข้อมูลหนังสือ
                      </td>
                    </tr>
                  ) : (
                    filteredBooks.map((book, index) => (
                      <tr key={book.id} className="hover:bg-green-50 transition-colors">
                        <td className="px-6 py-4 text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">{book.title}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{book.author}</td>
                        <td className="px-6 py-4 text-gray-700">{book.isbn}</td>
                        <td className="px-6 py-4 text-gray-700">{book.year}</td>
                        <td className="px-6 py-4">
                          <span className="text-indigo-700 font-semibold">
                            ฿{Number(book.price).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(book.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-viridian-700 transition-colors text-sm font-medium"
                            >
                              ✏️ แก้ไข
                            </button>
                            <button
                              onClick={() => handleDelete(book)}
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                            >
                              🗑️ ลบ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;