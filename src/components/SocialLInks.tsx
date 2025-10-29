import { JSX } from "react";
import { Send, Facebook, Twitter, Linkedin, Globe } from "lucide-react";

const socialIcons: Record<string, JSX.Element> = {
  facebook: <Facebook size={20} />,
  telegram: <Send size={20} />,
  linkedin: <Linkedin size={20} />,
  twitter: <Twitter size={20} />,
};

type SocialLinks = Record<string, string>;

export default function SocialLinksList({ links }: { links: SocialLinks }) {
  return (
    <div className="flex gap-4">
      {Object.entries(links).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          {socialIcons[platform.toLowerCase()] ?? <Globe size={20} />}
        </a>
      ))}
    </div>
  );
}
