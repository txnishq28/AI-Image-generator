import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:9000/api/v1/ImagiX', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:9000/api/v1/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-extrabold text-white text-4xl">✨ Create</h1>
        <p className="mt-2 text-gray-400 text-base max-w-xl mx-auto">
          Generate an imaginative image through AI and share it with the community.
        </p>
      </div>

      {/* Form */}
      <form className="mt-12 bg-[#111] p-6 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-300 mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Ex., John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-black text-white placeholder-gray-400 border border-gray-700 
                         rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white 
                         focus:border-white transition duration-300"
            />
          </div>

          {/* Prompt Field + Surprise Me */}
          <div>
            <label className="block text-gray-300 mb-2">Prompt</label>
            <div className="flex">
              <input
                type="text"
                name="prompt"
                placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                value={form.prompt}
                onChange={handleChange}
                className="flex-1 bg-black text-white placeholder-gray-400 border border-gray-700 
                           rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white 
                           focus:border-white transition duration-300"
              />
              <button
                type="button"
                onClick={handleSurpriseMe}
                className="ml-2 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-md 
                           hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 
                           transition duration-300"
              >
                Surprise me
              </button>
            </div>
          </div>

          {/* Image Preview */}
          <div className="relative border-2 border-dashed border-gray-600 rounded-xl p-4 
                          flex justify-center items-center bg-[#1a1a1a] min-h-[300px]">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-md"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-2/3 h-2/3 object-contain opacity-30"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/60 rounded-xl">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap">
          <button
            type="button"
            onClick={generateImage}
            className="bg-green-600 hover:bg-green-700 transition text-white 
                       font-medium rounded-lg px-6 py-3 text-sm"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 transition text-white 
                       font-medium rounded-lg px-6 py-3 text-sm"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500 text-center">
          💡 Once you create an image, share it with the community to inspire others!
        </p>
      </form>
    </section>
  );
};

export default CreatePost;
