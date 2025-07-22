import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { BellRing } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import Countdown from "react-countdown";
import Swal from "sweetalert2";

const CallWaiter = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [expiryTime, setExpiryTime] = useState<Date | null>(null);
  const [hasCalledBefore, setHasCalledBefore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const wasCalled = localStorage.getItem("hasCalledWaiter");
    if (wasCalled === "true") {
      setHasCalledBefore(true);
    }
  }, []);

  const renderer = ({
    minutes,
    seconds,
  }: {
    minutes: number;
    seconds: number;
  }) => {
    return (
      <span>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    );
  };

  const callWaiter = () => {
    const tableParam = searchParams.get("mesa");
    const table = tableParam ? parseInt(tableParam) : null;
    let postBody;

    if (hasCalledBefore) {
      postBody = {
        tableNumber: table,
        action: "call-waiter",
      };
    } else {
      postBody = {
        tableParam: table,
        action: "make-order",
      };
    }
  };

  const handleModal = () => {
    callWaiter();

    const time = new Date(Date.now() + 4 * 60 * 1000); // 4 minutos
    setIsDisabled(true);
    setExpiryTime(time);

    localStorage.setItem("hasCalledWaiter", "true");
    setHasCalledBefore(true);

    Swal.fire({
      icon: "success",
      title: "Has llamado a un mesero",
      text: "Un mesero te atenderá pronto",
      timer: 2500,
      showConfirmButton: false,
    });
  };

  return (
    <div
      className={`fixed right-3 bottom-3 flex justify-center items-center pl-6 py-1 rounded-xl pr-3 transition ${
        isDisabled
          ? "bg-amber-500/50 pointer-events-none"
          : "bg-amber-500 hover:bg-amber-400 cursor-pointer"
      }`}
    >
      {!isDisabled ? (
        <BellRing className={isDisabled ? "opacity-50" : "bell"} />
      ) : (
        <LoaderCircle className={isDisabled && "opacity-50 animate-spin"} />
      )}

      <Button
        onClick={handleModal}
        disabled={isDisabled}
        variant="ghost"
        className="text-[16px] font-semibold hover:bg-transparent"
      >
        {!isDisabled ? (
          !hasCalledBefore ? (
            "Listo para ordenar"
          ) : (
            "Llamar al mesero"
          )
        ) : expiryTime ? (
          <Countdown
            date={expiryTime}
            renderer={renderer}
            onComplete={() => {
              setIsDisabled(false);
              setExpiryTime(null);
            }}
          />
        ) : null}
      </Button>
    </div>
  );
};

export default CallWaiter;
