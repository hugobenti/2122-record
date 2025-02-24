import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-white p-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
        {/* Informações da empresa */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-purple-400">2122 Produções</h2>
          {/* <p className="mt-2">Rua Exemplo, 123</p>
          <p>Bairro, Cidade - Estado</p>
          <p className="mt-1">Telefone: (XX) XXXX-XXXX</p> */}
          <p>Email: 2122producoes@gmail.com</p>
        </div>

        {/* Redes sociais */}
        <div>
          <h3 className="text-xl font-semibold text-purple-400">Siga-nos</h3>
          <ul className="mt-2">
            <li>
              <a href="https://www.youtube.com/@2122prod" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                Youtube
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@2122.prod" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                TikTok
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/2122producoes/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="mt-8 border-t border-stone-700 pt-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} - 2122 Produções. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
