import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-12">
          {/* Informações da empresa */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-400 mb-4">2122 Produções</h2>
            {/* <p className="mt-2">Rua Exemplo, 123</p>
            <p>Bairro, Cidade - Estado</p>
            <p className="mt-1">Telefone: (XX) XXXX-XXXX</p> */}
            <p className="text-sm sm:text-base">Email: 2122producoes@gmail.com</p>
          </div>

          {/* Redes sociais */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-purple-400 mb-4">Siga-nos</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="https://www.youtube.com/@2122prod" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 text-sm sm:text-base transition-colors">
                  Youtube
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@2122.prod" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 text-sm sm:text-base transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/2122producoes/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 text-sm sm:text-base transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="mt-8 sm:mt-12 border-t border-stone-700 pt-4 sm:pt-6 text-center">
          <p className="text-xs sm:text-sm">
            © {new Date().getFullYear()} - 2122 Produções. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
