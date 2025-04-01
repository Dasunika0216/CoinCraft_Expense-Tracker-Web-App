import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: "💰",
      title: "Expense Tracking",
      description: "Easily track and categorize all your expenses in one place with our intuitive interface."
    },
    {
      icon: "📊",
      title: "Budget Management",
      description: "Create and manage budgets for different categories to keep your spending in check."
    },
    {
      icon: "📈",
      title: "Financial Insights",
      description: "Get detailed analytics and insights about your spending patterns and habits."
    },
    {
      icon: "🎯",
      title: "Goal Setting",
      description: "Set financial goals and track your progress towards achieving them."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#4339F2]/5 py-24">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#5c6ef7] rounded-full filter blur-[8rem] opacity-20" />
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-[#5c6ef7] rounded-full filter blur-[10rem] opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              About <span className="text-[#5c6ef7]">CoinCraft</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              We're on a mission to make personal finance management simple and effective for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
            To empower individuals with smarter financial management by providing an intuitive and user-friendly expense tracking platform. Our goal is to help users take control of their spending, build better saving habits, and achieve financial stability with ease. 
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What We Offer</h2>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive tools to manage your finances effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-[#5c6ef7]/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600">We believe in complete transparency in all our operations and features.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User First</h3>
              <p className="text-gray-600">Every decision we make puts our users' needs first.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">We continuously innovate to provide the best financial tools.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;