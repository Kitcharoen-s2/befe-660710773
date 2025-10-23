// EditBookPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    year: '',
    price: ''
  });

  // ดึงข้อมูลหนังสือที่จะแก้ไข
  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/api/v1/books/${id}`);
      
      if (!response.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลหนังสือได้');
      }
      
      const data = await response.json();
      setFormData({
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        year: data.year,
        price: data.price
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching book:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.author || !formData.isbn || !formData.year || !formData.price) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          isbn: formData.isbn,
          year: parseInt(formData.year),
          price: parseFloat(formData.price)
        })
      });

      if (!response.ok) {
        throw new Error('ไม่สามารถอัพเดทข้อมูลได้');
      }

      alert('อัพเดทข้อมูลหนังสือเรียบร้อยแล้ว!');
      navigate('/store-manager/books');
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
      console.error('Error updating book:', err);
    }
  };

  const handleCancel = () => {
    if (window.confirm('คุณต้องการยกเลิกการแก้ไขใช่หรือไม่?')) {
      navigate('/store-manager/books');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-viridian-600 to-green-700 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <p className="text-red-600 text-lg mb-6">❌ เกิดข้อผิดพลาด: {error}</p>
          <button 
            onClick={() => navigate('/store-manager/books')}
            className="px-6 py-3 bg-viridian-600 text-white rounded-lg hover:bg-viridian-700 transition-colors font-semibold"
          >
            กลับไปหน้ารายการหนังสือ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-viridian-600 to-green-600 text-white p-8 text-center">
            <h1 className="text-3xl font-bold">✏️ แก้ไขข้อมูลหนังสือ</h1>
            <p className="mt-2 text-viridian-100">แก้ไขรายละเอียดหนังสือในระบบ</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ชื่อหนังสือ */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  ชื่อหนังสือ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="กรอกชื่อหนังสือ"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-viridian-500 focus:border-viridian-500"
                />
              </div>

              {/* ผู้แต่ง */}
              <div>
                <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2">
                  ผู้แต่ง <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="กรอกชื่อผู้แต่ง"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-viridian-500 focus:border-viridian-500"
                />
              </div>

              {/* ISBN */}
              <div>
                <label htmlFor="isbn" className="block text-sm font-semibold text-gray-700 mb-2">
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  placeholder="กรอกหมายเลข ISBN (เช่น 978-1234567890)"
                  pattern="[0-9\-]+"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-viridian-500 focus:border-viridian-500"
                />
              </div>

              {/* ปีที่พิมพ์ & ราคา */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2">
                    ปีที่พิมพ์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="กรอกปี พ.ศ."
                    min="1900"
                    max="2100"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-viridian-500 focus:border-viridian-500"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                    ราคา (บาท) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="กรอกราคา"
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-viridian-500 focus:border-viridian-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                  ❌ ยกเลิก
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-viridian-600 to-green-600 text-white rounded-lg hover:from-viridian-700 hover:to-green-700 transition-all shadow-lg font-semibold"
                >
                  💾 บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;