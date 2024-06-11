import { Header } from "../components";
import { Input } from "../components/design/Input";
import { Label } from "../components/design/Label";

export const Checkout = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-70/30 px-12 pt-16 gap-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="mb-4">
            <Label htmlFor="email">Votre nom*</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Votre email*</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Pays*</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Ville*</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">adresse</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Numéro de téléphone*</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
            />
          </div>
        </div>
        <div>payer</div>
      </div>
    </div>
  );
};
