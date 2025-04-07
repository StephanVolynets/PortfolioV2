import React, { useState, FormEvent } from 'react';
import { Send, Mail, Github, Linkedin, Twitter, Loader2 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface ContactProps {
  theme: string;
}

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/yourusername',
    color: 'hover:text-gray-800 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/yourusername',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/yourusername',
    color: 'hover:text-blue-400'
  }
];

const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    // Simulate form submission
    try {
      // Replace with actual API call in production
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitResult({
        success: true,
        message: 'Your message has been sent successfully!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection
      id="contact"
      className={`py-24 ${theme === 'dark' ? 'bg-background' : 'bg-white'}`}
      animation="fadeInUp"
      threshold={0.1}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold mb-12 text-center text-primary">
          Get In Touch
        </h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            <AnimatedSection 
              className="md:col-span-2 space-y-8" 
              animation="fadeInLeft"
              delay={200}
            >
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center">
                  <Mail className="mr-2" /> Contact Information
                </h3>
                <p className="text-text mb-6">
                  Feel free to reach out for collaboration opportunities, job inquiries, or just to say hello!
                </p>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'}`}>
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <a 
                      href="mailto:your.email@example.com"
                      className="text-text hover:text-primary transition-colors"
                    >
                      your.email@example.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Connect With Me
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full ${
                          theme === 'dark' ? 'bg-highlight' : 'bg-gray-100'
                        } ${link.color} transition-all duration-300 hover:scale-110`}
                        aria-label={link.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
              
              <AnimatedSection 
                className="p-6 rounded-lg shadow-lg bg-primary text-white"
                animation="fadeInUp"
                delay={600}
              >
                <h4 className="text-xl font-semibold mb-2">Available for Opportunities</h4>
                <p className="mb-4">
                  Currently looking for opportunities in blockchain development and web3 technologies.
                </p>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span>Open to work</span>
                </div>
              </AnimatedSection>
            </AnimatedSection>

            <AnimatedSection 
              className="md:col-span-3" 
              animation="fadeInRight"
              delay={300}
            >
              <div className={`p-8 rounded-lg shadow-lg ${
                theme === 'dark' ? 'bg-highlight' : 'bg-gray-50'
              }`}>
                <h3 className="text-2xl font-semibold mb-6 text-primary">
                  Send Me a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-text font-medium mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 rounded-md border ${
                          theme === 'dark' 
                            ? 'bg-background border-gray-700 text-text focus:border-primary' 
                            : 'bg-white border-gray-300 text-gray-800 focus:border-primary'
                        } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors`}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-text font-medium mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 rounded-md border ${
                          theme === 'dark' 
                            ? 'bg-background border-gray-700 text-text focus:border-primary' 
                            : 'bg-white border-gray-300 text-gray-800 focus:border-primary'
                        } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors`}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="subject" 
                      className="block text-text font-medium mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 rounded-md border ${
                        theme === 'dark' 
                          ? 'bg-background border-gray-700 text-text focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-800 focus:border-primary'
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors`}
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-text font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`w-full p-3 rounded-md border ${
                        theme === 'dark' 
                          ? 'bg-background border-gray-700 text-text focus:border-primary' 
                          : 'bg-white border-gray-300 text-gray-800 focus:border-primary'
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none`}
                    />
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center justify-center w-full p-3 rounded-md bg-primary text-white font-medium transition-all hover:bg-primary/90 ${
                        isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                  
                  {submitResult && (
                    <div
                      className={`p-4 rounded-md ${
                        submitResult.success
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {submitResult.message}
                    </div>
                  )}
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;