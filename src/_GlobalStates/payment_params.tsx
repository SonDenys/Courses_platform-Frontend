import { loadStripe } from "@stripe/stripe-js";
import { SRIPE_PUBLISHABLE_KEY, STRIPE_KEY } from "../params";

export const stripePromise = loadStripe(SRIPE_PUBLISHABLE_KEY);
// export const stripePromise = loadStripe();
