import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="bg-surface min-h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Hero Carousel */}
      <section className="relative w-full h-96 md:h-screen overflow-hidden rounded-b-2xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-8 md:px-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-lg text-gray-200 mb-6">{slide.subtitle}</p>
              <button className="w-fit bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                {slide.cta}
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full z-20 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full z-20 transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-accent w-8 h-2'
                  : 'bg-white/40 w-2 h-2'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            Featured Products
          </h2>
          <p className="text-center text-muted mb-12">Handpicked for you</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
              >
                <div className="bg-gray-100 h-40 rounded mb-4 flex items-center justify-center">
                  <ShoppingCart size={40} className="text-primary opacity-50" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Product {item}</h3>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-success fill-success"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted mb-4">Quality product</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">$99.99</span>
                </div>
                <button className="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            Shop by Category
          </h2>
          <p className="text-center text-muted mb-12">Browse collections</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Electronics', icon: Zap },
              { name: 'Fashion', icon: TrendingUp },
              { name: 'Home & Garden', icon: Users },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-primary text-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <category.icon size={40} className="mx-auto mb-4 text-accent" />
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">
            Customer Reviews
          </h2>
          <p className="text-center text-muted mb-12">Trusted by customers</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="bg-white rounded-lg shadow p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-success fill-success"
                    />
                  ))}
                </div>
                <p className="text-muted mb-4">
                  "Amazing quality and fast shipping!"
                </p>
                <p className="font-semibold">Customer {review}</p>
                <p className="text-sm text-muted">Verified Buyer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 md:px-8 bg-primary text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="text-gray-200 mb-8">
            Get exclusive deals in your inbox
          </p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 px-4 py-3 rounded text-white  focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded font-semibold transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
