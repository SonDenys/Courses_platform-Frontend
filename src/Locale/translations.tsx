import { convert_to_i18n_format } from "./utils";

export type TranslationData = {
  [id: string]: {
    en?: string;
    fr?: string;
    de?: string;
    es?: string;
    pt?: string;
    ch?: string;
    ja?: string;
    ko?: string;
    zh?: string;
    ru?: string;
    ar?: string;
    tr?: string;
    it?: string;
    nl?: string;
    pl?: string;
    sv?: string;
    da?: string;
    fi?: string;
    no?: string;
    he?: string;
    id?: string;
    th?: string;
    vi?: string;
    hi?: string;
    ms?: string;
    hu?: string;
    fa?: string;
    ro?: string;
    sk?: string;
    cs?: string;
    bg?: string;
    sl?: string;
    hr?: string;
    ca?: string;
    el?: string;
    uk?: string;
  };
};

const data: TranslationData = {
  free_trial: {
    en: "Start your free 14-day trial, no credit card necessary. By providing your email, you agree to our terms of service.",
    fr: "Start your free 14-day trial, no credit card necessary. By providing your email, you agree to our terms of service.",
    de: "Starten Sie Ihre kostenlose 14-tägige Testversion, keine Kreditkarte erforderlich. Durch die Angabe Ihrer E-Mail stimmen Sie unseren Nutzungsbedingungen zu.",
    es: "Comience su prueba gratuita de 14 días, sin necesidad de tarjeta de crédito. Al proporcionar su correo electrónico, acepta nuestros términos de servicio.",
    ja: "クレジットカードは必要ありません。14日間の無料トライアルを開始してください。あなたの電子メールを提供することによって、あなたは私たちの利用規約に同意します。",
  },
  placeholder_email: {
    en: "Enter your email",
    fr: "Entrez votre email",
    de: "geben sie ihre E-Mail Adresse ein",
    es: "Introduce tu correo electrónico",
    ja: "メールアドレスを入力",
  },

  landing_title: {
    en: "The most secured way of sharing files",
    fr: "Le plus sécurisé moyen de partager des fichiers",
    de: "Die sicherste Weg, um Dateien zu teilen",
    es: "La manera más segura de compartir archivos",
    ja: "ファイルを共有するために最も安全な方法",
    zh: "最安全的方法分享文件",
    ko: "파일을 공유하는 데 최적의 방법",
  },
  landing_subtitle: {
    en: "Share End-to-End encrypted files with anyone, anywhere, anytime",
    fr: "Partagez des fichiers chiffrés de manière sécurisée et confidentielle",
    de: "Teile deine Dateien end-to-end verschlüsselt mit jedem, jederzeit, überall",
    es: "Comparte archivos cifrados de manera segura y confidencial",
    ja: "どこででも、いつでも、誰でも、誰でも、ファイルを暗号化して共有することができます",
    zh: "隨時隨地、隨處、隨處，共享加密文件",
    ko: "누구나, 어디에나, 언제나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어떤 시간에서나, 어떤 장소에서나, 어",
    no: "Del deg end-to-end krypterte filer med hvem som helst, hvor som helst, når som helst",
    fi: "Jaa salaamattomasti ja yksityisesti kohdettuja tiedostoja kenen tahansa paikkaan, ajan tasalla",
    da: "Del end-to-end krypterede filer med hvem som helst, hvor som helst, når som helst",
    it: "Condividi file cifrati end-to-end con chiunque, ovunque, quando vuoi",
  },
  hello: {
    en: "Hello",
    fr: "Bonjour",
    de: "Halo",
    ja: "日本語",
    es: "hola",
  },
  create_new: {
    en: "Create New",
    fr: "Créer un nouveau",
    de: "Create New",
    ja: "新規作成",
    es: "Crear nuevo",
  },
  tickets: {
    en: "Tickets",
    fr: "Billets",
    de: "Tickets",
    ja: "チケット",
    es: "Entradas",
  },
  dashboard: {
    en: "Dashboard",
    fr: "Tableau de bord",
    de: "Dashboard",
    ja: "ダッシュボード",
    es: "Tablero de mandos",
  },
  "knowledge base": {
    en: "Knowledge base",
    fr: "Base de connaissances",
    de: "Knowledge base",
    ja: "知識ベース",
    es: "Base de conocimientos",
  },
  "live chat": {
    en: "Live chat",
    fr: "Chat en direct",
    de: "Live chat",
    ja: "ライブチャット",
    es: "Chat en directo",
  },
  agents: {
    en: "Agents",
    fr: "Agents",
    de: "Agents",
    ja: "エージェント",
    es: "Agentes",
  },
  teams: {
    en: "Teams",
    fr: "Équipes",
    de: "Teams",
    ja: "チーム",
    es: "Equipos",
  },
  contacts: {
    en: "Contacts",
    fr: "Contacts",
    de: "Contacts",
    ja: "連絡先",
    es: "Contactos",
  },
  all: {
    en: "All",
    fr: "All",
    de: "All",
    ja: "All",
    es: "All",
  },
  new: {
    en: "New",
    fr: "New",
    de: "New",
    ja: "New",
    es: "New",
  },
  open: {
    en: "Open",
    fr: "Open",
    de: "Open",
    ja: "Open",
    es: "Open",
  },
  closed: {
    en: "Closed",
    fr: "Closed",
    de: "Closed",
    ja: "Closed",
    es: "Closed",
  },
  status: {
    en: "Status",
    fr: "Status",
    de: "Status",
    ja: "Status",
    es: "Status",
  },
  customer: {
    en: "Customer",
    fr: "Customer",
    de: "Customer",
    ja: "Customer",
    es: "Customer",
  },
  organization: {
    en: "Organization",
    fr: "Organization",
    de: "Organization",
    ja: "Organization",
    es: "Organization",
  },
  knowledge: {
    en: "Knowledge Base",
    fr: "Knowledge Base",
    de: "Knowledge Base",
    ja: "Knowledge Base",
    es: "Knowledge Base",
  },
  entities: {
    en: "Entities",
    fr: "Entities",
    de: "Entities",
    ja: "Entities",
    es: "Entities",
  },
  direct_message: {
    en: "Direct Messages",
    fr: "Message direct",
    de: "Direktnachricht",
    ja: "ダイレクトメッセージ",
  },
  channels: {
    en: "Channels",
    fr: "Chaînes",
    de: "Kanäle",
    ja: "Channels",
  },
  go_back: {
    en: "Go back",
    fr: "Retourner",
    de: "Zurückgehen",
    ja: "戻る",
  },
  please_check_url: {
    en: "Please check the URL in the address bar and try again",
    fr: "Veuillez vérifier l'URL dans la barre d'adresse et réessayer.",
    de: "Bitte überprüfen Sie die URL in der Adressleiste und versuchen Sie es erneut",
    ja: "アドレスバーに表示されているURLをご確認の上、再度お試しください。",
  },
  page_not_found: {
    en: "Page not found",
    fr: "Page non trouvée",
    de: "Seite nicht gefunden",
    ja: "ページが見つかりません",
  },
  download: {
    en: "Download",
    fr: "Télécharger",
    de: "Download",
    ja: "Download",
  },
  price: {
    en: "Price",
    fr: "Prix",
    de: "Price",
    ja: "Price",
  },
  signin: {
    en: "Sign in",
    fr: "S'identifier",
    de: "Anmeldung",
    ja: "サインイン",
  },
  signup: {
    en: "Sign up",
    fr: "S'inscrire",
    de: "Anmeldung",
    ja: "サインアップ",
  },
  signin_to_your_account: {
    en: "Sign in to your account",
    fr: "Connectez-vous à votre compte",
    de: "Melden Sie sich bei Ihrem Konto an",
    ja: "アカウントにサインイン",
  },
  create_a_new_account: {
    en: "Create a new account",
    fr: "Créer un nouveau compte",
    de: "Neues Konto erstellen",
    ja: "新規アカウントを作成",
  },
};

const translation_data = convert_to_i18n_format(data);

export function get_translation_data() {
  return translation_data;
}
