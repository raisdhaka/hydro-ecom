/* eslint-disable prettier/prettier */
import { NavLink } from '@remix-run/react';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import { useRootLoaderData } from '~/root';

export function Footer({
  menu,
  shop,
}: FooterQuery & { shop: HeaderQuery['shop'] }) {
  return (
    <footer className="footer">
      {menu && shop?.primaryDomain?.url && (
        <FooterMenu menu={menu} primaryDomainUrl={shop.primaryDomain.url} />
      )}
    </footer>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: HeaderQuery['shop']['primaryDomain']['url'];
}) {
  const { publicStoreDomain } = useRootLoaderData();

  return (
    <div id="footer">
      <div className="container">
        <div className="row my-5">
          <div className="col-sm-6">
            <img src="/img/logo.svg" alt="logo" />
            <h3>Subscribe</h3>
            <p>Get 10% off your first order</p>
            <p>Offers and discounts</p>
          </div>
          <div className="col-sm-6 d-flex justify-content-between">
            <div>
              <h2>Support</h2>
              <a href='#'>Anime@gmail.com</a>
              <a href='#'>+88015-88888-9999</a>
            </div>
            <div>
              <h2>Account</h2>

              <a href='#'>My Account</a>
              <a href='#'>Login / Register</a>
              <a href='#'>Cart</a>
              <a href='#'>Wishlist</a>
              <a href='#'>Shop</a>
            </div>
            <div>
              <h2>Quick Link</h2>
              <a href='#'>Privacy Policy</a>
              <a href='#'>Terms Of Use</a>
              <a href='#'>FAQ</a>
              <a href='#'>Contact</a>
            </div>



          </div>
        </div>
      </div>
      {/* <nav className="footer-menu" role="navigation">
        {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
          if (!item.url) return null;
          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain) ||
              item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          const isExternal = !url.startsWith('/');
          return isExternal ? (
            <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
              {item.title}
            </a>
          ) : (
            <NavLink
              end
              key={item.id}
              prefetch="intent"
              style={activeLinkStyle}
              to={url}
            >
              {item.title}
            </NavLink>
          );
        })}
      </nav> */}
    </div>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
