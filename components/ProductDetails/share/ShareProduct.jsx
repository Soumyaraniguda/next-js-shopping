import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import styles from "./styles.module.scss";

function ShareProduct() {
  const url = window?.location.href;
  return (
    <div className={styles.share}>
      <FacebookShareButton url={url}>
        <FacebookIcon size={38} />
      </FacebookShareButton>

      <FacebookMessengerShareButton url={url}>
        <FacebookMessengerIcon size={38} />
      </FacebookMessengerShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon size={38} />
      </TwitterShareButton>

      <RedditShareButton url={url}>
        <RedditIcon size={38} />
      </RedditShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon size={38} />
      </TelegramShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon size={38} />
      </WhatsappShareButton>

      <PinterestShareButton url={url}>
        <PinterestIcon size={38} />
      </PinterestShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon size={38} />
      </LinkedinShareButton>

      <EmailShareButton url={url}>
        <EmailIcon size={38} />
      </EmailShareButton>
    </div>
  );
}

export default ShareProduct;
