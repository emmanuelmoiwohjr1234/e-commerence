import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendar, FaUser, FaComment, FaTag } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: '10 Essential Style Tips for Every Man',
    excerpt: 'Discover the key fashion rules that will help you build a timeless and versatile wardrobe...',
    image: '/images/blog/mens-style.jpg',
    category: 'Men\'s Fashion',
    author: 'David Miller',
    date: '2023-12-01',
    comments: 24,
    tags: ['Style Guide', 'Men\'s Fashion', 'Wardrobe Essentials']
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Jewelry Care',
    excerpt: 'Learn how to properly clean, store, and maintain your precious jewelry to keep it looking beautiful...',
    image: '/images/blog/jewelry-care.jpg',
    category: 'Jewelry',
    author: 'Sarah Johnson',
    date: '2023-11-28',
    comments: 18,
    tags: ['Jewelry Care', 'Maintenance', 'Tips']
  },
  {
    id: 3,
    title: 'Summer Fashion Trends 2024',
    excerpt: 'Get ahead of the curve with our preview of next summer\'s hottest fashion trends...',
    image: '/images/blog/summer-trends.jpg',
    category: 'Fashion Trends',
    author: 'Emma Wilson',
    date: '2023-11-25',
    comments: 32,
    tags: ['Summer Fashion', 'Trends', 'Style Guide']
  },
  {
    id: 4,
    title: 'How to Choose the Perfect Perfume',
    excerpt: 'A comprehensive guide to finding your signature scent and understanding fragrance families...',
    image: '/images/blog/perfume-guide.jpg',
    category: 'Beauty',
    author: 'Sophie Chen',
    date: '2023-11-22',
    comments: 45,
    tags: ['Perfume', 'Beauty', 'Guide']
  },
  {
    id: 5,
    title: 'Sustainable Fashion: A Better Future',
    excerpt: 'Explore how sustainable fashion is reshaping the industry and how you can make eco-friendly choices...',
    image: '/images/blog/sustainable-fashion.jpg',
    category: 'Sustainability',
    author: 'Michael Green',
    date: '2023-11-19',
    comments: 56,
    tags: ['Sustainability', 'Eco-Friendly', 'Fashion']
  },
  {
    id: 6,
    title: 'Wedding Jewelry Trends for 2024',
    excerpt: 'Discover the latest trends in bridal jewelry and find the perfect pieces for your special day...',
    image: '/images/blog/wedding-jewelry.jpg',
    category: 'Jewelry',
    author: 'Lisa Anderson',
    date: '2023-11-16',
    comments: 29,
    tags: ['Wedding', 'Jewelry', 'Trends']
  }
];

const categories = [
  'All Categories',
  'Men\'s Fashion',
  'Women\'s Fashion',
  'Jewelry',
  'Beauty',
  'Sustainability',
  'Fashion Trends'
];

const BlogCard = ({ post }) => (
  <article className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="relative group">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Link
          to={`/blog/${post.id}`}
          className="btn btn-primary"
        >
          Read More
        </Link>
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
        <span className="flex items-center">
          <FaCalendar className="mr-2" />
          {new Date(post.date).toLocaleDateString()}
        </span>
        <span className="flex items-center">
          <FaUser className="mr-2" />
          {post.author}
        </span>
        <span className="flex items-center">
          <FaComment className="mr-2" />
          {post.comments}
        </span>
      </div>

      <Link
        to={`/blog/${post.id}`}
        className="block"
      >
        <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
          {post.title}
        </h2>
      </Link>
      
      <p className="text-gray-600 mb-4">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
          >
            <FaTag className="mr-1" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  </article>
);

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Fashion & Style Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay up to date with the latest fashion trends, style tips, and industry insights. 
          Our expert writers bring you the best content from the world of fashion and beauty.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full md:w-64"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input w-full md:w-auto"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No articles found matching your criteria.</p>
        </div>
      )}

      {/* Newsletter Subscription */}
      <div className="bg-primary text-white rounded-lg p-8 mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6">
            Get the latest fashion tips, style guides, and industry news delivered directly to your inbox.
          </p>
          <form className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="input bg-white text-gray-900 w-full md:w-auto"
            />
            <button
              type="submit"
              className="btn bg-white text-primary hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
