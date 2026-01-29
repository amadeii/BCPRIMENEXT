import { SiWhatsapp } from "react-icons/si";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os serviços da BCPrimeON."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      data-testid="button-whatsapp-float"
    >
      <SiWhatsapp className="h-7 w-7" />
      <span className="sr-only">Fale conosco no WhatsApp</span>
    </a>
  );
}
