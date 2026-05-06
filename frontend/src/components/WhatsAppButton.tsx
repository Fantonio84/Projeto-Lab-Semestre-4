import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string; // Exemplo: '5511999999999'
  message?: string;
}

export function WhatsAppButton({ phoneNumber, message = "Olá! Gostaria de mais informações." }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
      aria-label="Enviar mensagem no WhatsApp"
      title="Enviar mensagem no WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
}