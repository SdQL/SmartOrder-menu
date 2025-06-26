import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";
import Swal from "sweetalert2";

const CallWaiter = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleModal = () => {
    setIsDisabled(true)

    Swal.fire({
      icon: "success",
      title: "Has llamado a un mesero",
      text: "Un mesero te atenderá pronto",
      timer: 2500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      setIsDisabled(false);
    }, 600000)
  };

  return (
    <div
      className={
        !isDisabled
          ? "flex fixed right-3 bottom-3 justify-center items-center bg-amber-500 pl-6 py-1 rounded-xl pr-3 hover:bg-amber-400 hover:cursor-pointer}"
          : "bg-amber-500/50 pointer-events-none flex fixed right-3 bottom-3 justify-center items-center pl-6 py-1 rounded-xl pr-3"
      }
    >
      <BellRing className={!isDisabled ? "bell" : "opacity-50"} />
      <Button
        onClick={handleModal}
        disabled={isDisabled}
        variant="ghost"
        className="text-[16px] font-semibold hover:bg-transparent"
      >
        {!isDisabled ? "Listo para ordenar" : "Ya llamaste a un mesero"}
      </Button>
    </div>
  );
};

export default CallWaiter;
