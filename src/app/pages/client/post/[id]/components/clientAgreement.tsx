"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { errorAlert } from "@/app/utils/alert"

export function ClientAgreementModal({
  callBack,
  isDisabled,
}: {
  callBack: () => void
  isDisabled: boolean
}) {
  const [open, setOpen] = useState(false)



  const [health, setHealth] = useState({
    pregnant: false,
    medicalCondition: false,
    bloodThinner: false,
    skinCondition: false,
  })

  const [consent, setConsent] = useState({
    infoTrue: false,
    understandRisk: false,
    agreeProceed: false,
  })

  const validate = () => {
    const hasHealthIssue =
      health.pregnant &&
      health.medicalCondition &&
      health.bloodThinner &&
      health.skinCondition

    const consentAccepted =
      consent.infoTrue &&
      consent.understandRisk &&
      consent.agreeProceed

    return hasHealthIssue && consentAccepted
  }

  const submitForm = () => {
    if (!validate()) {
      errorAlert("Some required conditions were not met. Please consult the artist before proceeding.");
      return
    }

    setOpen(false)
    callBack()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={isDisabled}>
          Confirm Booking
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Health & Consent</DialogTitle>
          <DialogDescription>
            Please review and confirm before proceeding.
          </DialogDescription>
        </DialogHeader>

        {/* Health Section */}
        <div className="space-y-3 text-sm mx-h-[600px] overflow-auto">
          <h3 className="font-semibold">Health Declaration</h3>

          {[
            { key: "pregnant", label: "I am NOT pregnant or breastfeeding" },
            { key: "medicalCondition", label: "I do NOT have serious medical conditions" },
            { key: "bloodThinner", label: "I am NOT taking blood-thinning medication" },
            { key: "skinCondition", label: "I do NOT have severe skin conditions" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(health as any)[key]}
                onChange={(e) =>
                  setHealth({ ...health, [key]: e.target.checked })
                }
              />
              {label}
            </label>
          ))}
        </div>

        {/* Consent Section */}
        <div className="space-y-3 text-sm mt-6">
          <h3 className="font-semibold">Consent</h3>

          {[
            { key: "infoTrue", label: "I confirm that the information is true and correct" },
            { key: "understandRisk", label: "I understand the risks of tattooing" },
            { key: "agreeProceed", label: "I agree to proceed at my own responsibility" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={(consent as any)[key]}
                onChange={(e) =>
                  setConsent({ ...consent, [key]: e.target.checked })
                }
              />
              {label}
            </label>
          ))}

          


        </div>

        <DialogFooter className="mt-6">
          <Button onClick={submitForm} className="w-full">Submit Form </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
