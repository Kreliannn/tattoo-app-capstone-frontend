import Swal from "sweetalert2"
import { toast } from "sonner"

export const confirmAlert = (text : string, buttonText : string, callback : () => void) => {
    Swal.fire({
        title: 'Are you sure?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#22c55e',
        cancelButtonColor: '#d33',
        confirmButtonText: buttonText
      }).then((result) => {
        if (result.isConfirmed) {
            callback()
        }
      })
} 

export const successAlert = (text: string) => {
    toast.success("Success", {
      description: text,
    });
  };
  

export const errorAlert = (text : string) => {
    toast.error("Error", {
        description: text,
      });
}



export function showHealthChecklist(callback : () => void) {
  Swal.fire({
    title: "Health Declaration",
    html: `
      <div style="text-align:left">
        <label>
          <input type="checkbox" id="pregnant" />
          Pregnant or breastfeeding
        </label><br/><br/>
        <label>
          <input type="checkbox" id="bloodThinner" />
          Taking blood-thinning medication
        </label><br/><br/>
        <label>
          <input type="checkbox" id="skinCondition" />
          Serious skin condition
        </label>
      </div>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Continue Booking",
    preConfirm: () => {
      const pregnant =  (document.getElementById("pregnant") as HTMLInputElement)?.checked ?? false;
      const bloodThinner = (document.getElementById("bloodThinner") as HTMLInputElement)?.checked ?? false;
      const skinCondition = (document.getElementById("skinCondition") as HTMLInputElement)?.checked ?? false;

      if (pregnant || bloodThinner || skinCondition) {
        Swal.showValidationMessage(
          "Booking cannot proceed due to health restrictions. Please Consult To Artist first"
        );
        return false;
      }

      return {
        pregnant,
        bloodThinner,
        skinCondition,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      callback(); // ✅ CALLBACK
    }
  });
}