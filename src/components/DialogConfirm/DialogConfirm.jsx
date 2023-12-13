import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


  // eslint-disable-next-line react/prop-types
  export function DialogConfirm({ onAction, customTitle="Confirmare", customDescription="Sunteti sigur?", children }) {
    return (
      <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
          <AlertDialogHeader>
          <AlertDialogTitle>{customTitle}</AlertDialogTitle>
          <AlertDialogDescription>{customDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel>Nu</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>Da</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>        
    )
}