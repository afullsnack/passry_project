import { Store } from "@tanstack/store";

export interface IChangePasswordData {
  oldPassword: string | null;
  newPassword: string | null;
  confirmNewPassword: string | null;
}

export const changePasswordStore = new Store<IChangePasswordData>({
  oldPassword: null,
  newPassword: null,
  confirmNewPassword: null
}, {
  onUpdate: () => {
    console.log("Changed password")
  }
})
