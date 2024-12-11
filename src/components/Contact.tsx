import React, { useState } from 'react';
import { Send, Linkedin, Github, Mail } from 'lucide-react';
import { RoughNotation } from 'react-rough-notation';

interface ContactProps {
  theme: string;
}

const Contact: React.FC<ContactProps> = ({/* Theme */}) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission, implement later on. 
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', formState);
    setIsSubmitting(false);
    setFormState({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 section-fade bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-primary">
          <RoughNotation type="underline" color="#86C232" show={true} strokeWidth={3}>
            Let's Connect!
          </RoughNotation>
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start max-w-4xl mx-auto">
          <form className="w-full md:w-1/2 mb-8 md:mb-0" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-text">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formState.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-highlight text-text border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-text">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formState.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-highlight text-text border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-text">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                value={formState.message}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-highlight text-text border border-accent rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-primary text-background py-2 px-4 rounded-md hover:bg-secondary transition-colors flex items-center justify-center hover-effect"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-background mr-2"></span>
              ) : (
                <Send size={20} className="mr-2" />
              )}
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Connect with me</h3>
            <div className="space-y-4">
              <a href="https://linkedin.com/in/stephanvolynets" target="_blank" rel="noopener noreferrer" className="flex items-center text-text hover:text-primary transition-colors">
                <Linkedin size={24} className="mr-2" /> LinkedIn.com/in/stephan-volynets
              </a>
              <a href="https://github.com/stephanvolynets" target="_blank" rel="noopener noreferrer" className="flex items-center text-text hover:text-primary transition-colors">
                <Github size={24} className="mr-2" /> GitHub.com/stephanvolynets
              </a>
              <a href="mailto:svv6@cornell.edu" className="flex items-center text-text hover:text-primary transition-colors">
                <Mail size={24} className="mr-2" /> svv6@cornell.edu
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
