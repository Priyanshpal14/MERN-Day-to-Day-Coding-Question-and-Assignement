// src/components/AddBookForm.jsx
import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PlusCircle, DollarSign } from 'lucide-react';
import BookActions from '../flux/BookActions';

// Validation Schema
const bookValidationSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  author: Yup.string()
    .min(2, 'Author name must be at least 2 characters')
    .max(50, 'Author name must be less than 50 characters')
    .required('Author is required'),
  price: Yup.number()
    .positive('Price must be positive')
    .min(0.01, 'Price must be at least $0.01')
    .max(9999.99, 'Price must be less than $10,000')
    .required('Price is required')
});

function AddBookForm({ onSuccess }) {
  const initialValues = {
    title: '',
    author: '',
    price: ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Dispatch action through Flux
    BookActions.addBook({
      title: values.title,
      author: values.author,
      price: parseFloat(values.price)
    });
    
    resetForm();
    setSubmitting(false);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-white/50">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-xl">
          <PlusCircle className="text-white" size={24} />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Add New Book
        </h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={bookValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors, handleSubmit: formikHandleSubmit }) => (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Book Title *
              </label>
              <Field
                name="title"
                type="text"
                placeholder="Enter book title"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${
                  touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author Name *
              </label>
              <Field
                name="author"
                type="text"
                placeholder="Enter author name"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${
                  touched.author && errors.author ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <ErrorMessage
                name="author"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (USD) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={20} />
                <Field
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${
                    touched.price && errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="button"
              onClick={formikHandleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-xl"
            >
              {isSubmitting ? 'Adding Book...' : '✨ Add Book to Collection'}
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default AddBookForm;