import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=500&fit=crop',
      title: 'Summer Collection',
      subtitle: 'Discover the latest trends',
      cta: 'Shop Now',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&h=500&fit=crop',
      title: 'New Arrivals',
      subtitle: 'Fresh items just in',
      cta: 'Explore',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=1200&h=500&fit=crop',
      title: 'Exclusive Deals',
      subtitle: 'Up to 50% off',
      cta: 'View Deals',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Carousel Section */}
      <div className="relative w-full h-screen max-h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex flex-col justify-center items-start text-white pl-8 md:pl-16">
              <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white">{slide.title}</h1>
              <p className="text-2xl mb-8 text-gray-100">{slide.subtitle}</p>
              <button className="bg-accent hover:bg-success text-white px-10 py-4 rounded-lg font-semibold transition transform hover:scale-105">
                {slide.cta}
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-10 backdrop-blur-sm transition"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-10 backdrop-blur-sm transition"
        >
          <ChevronRight size={28} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'bg-accent w-8 h-3' 
                  : 'bg-white/40 w-3 h-3 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">
            Featured Products
          </h2>
          <p className="text-center text-muted mb-16 text-lg">Handpicked selections just for you</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-56 flex items-center justify-center relative overflow-hidden">
                  <ShoppingCart size={56} className="text-primary opacity-60 group-hover:scale-110 group-hover:text-accent transition-all" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-primary text-xl mb-3">
                    Product {item}
                  </h3>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-success fill-success"
                      />
                    ))}
                  </div>
                  <p className="text-muted text-base mb-4 line-clamp-2">Premium quality product with exceptional craftsmanship</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">$99.99</span>
                  </div>
                  <button className="w-full bg-accent hover:bg-success text-white py-3 rounded-lg font-semibold transition transform hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">
            Shop by Category
          </h2>
          <p className="text-center text-muted mb-16 text-lg">Explore our curated collections</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Electronics', icon: '🔌' },
              { name: 'Fashion', icon: '👕' },
              { name: 'Home & Garden', icon: '🏠' },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-10 text-white text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="text-6xl mb-6">{category.icon}</div>
                <h3 className="text-2xl font-bold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">
            Customer Reviews
          </h2>
          <p className="text-center text-muted mb-16 text-lg">Trusted by thousands</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((review) => (
              <div key={review} className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-success fill-success"
                    />
                  ))}
                </div>
                <p className="text-muted mb-6 text-lg leading-relaxed">
                  "Amazing quality and fast shipping. Will definitely order again!"
                </p>
                <p className="font-semibold text-primary text-lg">Customer {review}</p>
                <p className="text-muted text-sm">Verified Buyer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg mb-10 text-gray-100">
            Get exclusive deals and latest collections delivered to your inbox
          </p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-4 rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="bg-accent hover:bg-success text-white px-10 py-4 rounded-lg font-semibold transition transform hover:scale-105 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
