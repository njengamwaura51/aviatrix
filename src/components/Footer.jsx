const LOGO_URL = 'https://www.aspirebet.ke/_next/static/media/av_logo.809fbe43.svg';
const WHATSAPP_ICON =
  'https://www.aspirebet.ke/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwhatsapp_logo.08182562.png&w=1080&q=75';
const CALL_ICON =
  'https://www.aspirebet.ke/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcall_icon.555d4c2f.png&w=1080&q=75';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1B1C1D] border-t border-[#2A2B2E] mt-auto">
      <div className="px-[8px] py-[8px]">
        {/* Footer top */}
        <div className="flex flex-wrap gap-[8px] items-start justify-between mb-[8px]">
          {/* Brand */}
          <div className="flex flex-col gap-[4px]">
            <img src={LOGO_URL} alt="Aspirebet" className="h-[32px]" />
            <p className="text-[#6B7280] text-[11px] max-w-[240px]">
              Bet responsibly. Must be 18+ to participate. Aspirebet is licensed and regulated.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-[4px]">
            <h4 className="text-[#E5E7EB] text-[12px] font-semibold mb-[2px]">Quick Links</h4>
            {['Sports', 'Live Betting', 'Casino', 'Aviator', 'Promotions'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#9CA3AF] text-[11px] hover:text-[#E5E7EB] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Support */}
          <div className="flex flex-col gap-[4px]">
            <h4 className="text-[#E5E7EB] text-[12px] font-semibold mb-[2px]">Support</h4>
            {['Help Center', 'Responsible Gambling', 'Privacy Policy', 'Terms &amp; Conditions'].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#9CA3AF] text-[11px] hover:text-[#E5E7EB] transition-colors"
                  dangerouslySetInnerHTML={{ __html: link }}
                />
              )
            )}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-[4px]">
            <h4 className="text-[#E5E7EB] text-[12px] font-semibold mb-[2px]">Contact Us</h4>
            <div className="flex items-center gap-[4px]">
              <img src={CALL_ICON} alt="Call" className="w-[14px] h-[14px]" />
              <span className="text-[#9CA3AF] text-[11px]">0800 723 000</span>
            </div>
            <div className="flex items-center gap-[4px]">
              <img src={WHATSAPP_ICON} alt="WhatsApp" className="w-[14px] h-[14px]" />
              <span className="text-[#9CA3AF] text-[11px]">WhatsApp Support</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2A2B2E] pt-[8px]">
          <div className="flex flex-wrap items-center justify-between gap-[4px]">
            <p className="text-[#6B7280] text-[11px]">
              © 2024 Aspirebet. All rights reserved.
            </p>
            <div className="flex items-center gap-[8px]">
              <span className="px-[4px] py-[2px] rounded-[6px] bg-[#2A2B2E] text-[#9CA3AF] text-[10px]">
                18+
              </span>
              <span className="text-[#6B7280] text-[10px]">Bet Responsibly</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
