import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import DigitalTunnel from "@/components/digital-tunnel-bg";
import { format } from "date-fns";
import { ArrowRightCircleIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigate = useNavigate();
  const { data, isPending } = useSession();
  useEffect(() => {
    if (data) {
      navigate({
        to: "/avtal",
      });
    }
  }, [data, navigate]);
  if (isPending) {
    return <></>;
  }

  return (
    <div className="font-sans ">
      <DigitalTunnel />

      <main className="container mx-auto px-4 md:px-8 ">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent mb-6">
              Generera anställningsavtal på 2 minuter
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 mt-8 max-w-3xl mx-auto">
              AI-genererade avtal som är{" "}
              <span className="font-semibold text-blue-200">
                100% anpassade
              </span>{" "}
              efter din bransch, verksamhet och behov -{" "}
              <span className="font-bold border-b-2 border-green-400">
                lagligt, korrekt, snabbt och billigt
              </span>{" "}
            </p>

            {/* CTA Button */}
            <div className="mt-10">
              <Link to="/avtal">
                <Button className="bg-green-500 hover:bg-green-400 text-gray-900 text-xl py-6 px-12 rounded-xl transform transition-all hover:scale-105 shadow-lg shadow-green-500/25">
                  Skapa mitt avtal nu
                  <ArrowRightCircleIcon className="ml-3  inline-block" />
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-5 w-5 text-green-400 mr-2" />
                <span>Uppdaterat enligt senaste arbetsrättslagstiftningen</span>
              </div>
              <div className="flex items-center">
                <ShieldCheckIcon className="h-5 w-5 text-purple-400 mr-2" />
                <span>Ingen data lagras - GDPR-kompatibelt</span>
              </div>
              <div className="flex items-center">
                <UsersIcon className="h-5 w-5 text-blue-400 mr-2" />
                <span>1 + genererade avtal</span>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-24 border border-gray-700 rounded-2xl p-1 bg-[#0F172A] shadow-xl">
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gray-800 p-4 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-gray-400">
                  Anställningsavtal.pdf
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    // <div className="md:pb-48 pb-64 font-sans">
    //   <DigitalTunnel />
    //   <main className="container mx-auto px-6 gap-10">
    //     <div className="max-w-2xl flex flex-col">
    //       <h1 className="mb-6 py-4 md:py-8 text-5xl md:text-6xl font-bold md:text-left text-center">
    //         AI som säljer för dig – dygnet runt <br />
    //       </h1>
    //       <p className="px-16 text-center md:p-0 mb-8 text-md md:text-xl text-muted-foreground">
    //         Boka fler möten, skapa fler leads och öka försäljningen med vår
    //         AI-drivna säljassistent. &nbsp;
    //         <span className="font-semibold text-white/90 pb-1">
    //           Enkelt, skalbart och effektivt.
    //         </span>
    //       </p>
    //       <div className="mt-6 flex flex-col w-full items-center justify-center md:block gap-4">
    //         <Link to="/signin" search={{ email: undefined }}>
    //           <Button className="w-64 bg-[#8257FF] hover:bg-[#724ee3] text-white px-8 py-6 text-lg rounded-lg">
    //             Jag vill ha fler leads
    //             <span className="ml-2">→</span>
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //   </main>
    // </div>
  );
}
