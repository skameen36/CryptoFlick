import React from 'react';

const CoinInfo = ({ links }) => {
  if (!links) return null;

  return (
    <div className="detail-section anim-section">
      <h3 className="section-title">Information</h3>
      <div className="links-grid">
        {links.homepage?.[0] && (
          <a href={links.homepage[0]} target="_blank" rel="noreferrer" className="link-chip">
            🌐 Website
          </a>
        )}
        {links.blockchain_site?.slice(0, 3).map((site, i) => (
          site && <a href={site} key={i} target="_blank" rel="noreferrer" className="link-chip">
            🔗 Explorer {i + 1}
          </a>
        ))}
        {links.repos_url?.github?.[0] && (
          <a href={links.repos_url.github[0]} target="_blank" rel="noreferrer" className="link-chip">
            💻 Source Code
          </a>
        )}
        {links.subreddit_url && (
          <a href={links.subreddit_url} target="_blank" rel="noreferrer" className="link-chip">
            🤖 Reddit
          </a>
        )}
      </div>
    </div>
  );
};

export default CoinInfo;
