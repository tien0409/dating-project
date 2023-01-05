import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

import { UserPhotoInputProps } from ".";
import { useUploadSingleImageData } from "@/hooks/useUploadData";
import { convertToFormData } from "@/utils/upload";
import { useCreatePhotoData, useDeletePhotoData, useUpdatePhotoData } from "@/hooks/useUsersData";
import { useAuthStore } from "@/store";

const useUserPhotoInput = (props: UserPhotoInputProps) => {
  const { photo } = props;

  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);

  const inputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<any>(photo?.link);
  const [loading, setLoading] = useState<boolean>(false);

  const { mutateAsync } = useUploadSingleImageData();
  const { mutateAsync: createPhotoMutationAsync } = useCreatePhotoData();
  const { mutateAsync: updatePhotoMutationAsync } = useUpdatePhotoData();
  const { mutateAsync: deletePhotoMutationAsync } = useDeletePhotoData();

  const handleInputClick = () => {
    inputRef.current?.click();
  };

  const handleInputFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        setLoading(true);
        const res = await mutateAsync(convertToFormData({ file: [e.target.files?.[0]] }));
        await createPhotoMutationAsync({ link: res?.data?.url });

        if (photo?.id) {
          const { data: res1 } = await updatePhotoMutationAsync({
            id: photo.id,
            link: res?.data?.url,
          });
          profile?.photos &&
            setProfile({
              ...profile,
              photos: profile?.photos?.map((p) => (p.id === photo.id ? res1.data : p)),
            });
        } else {
          const { data: res2 } = await createPhotoMutationAsync({ link: res?.data?.url });
          profile?.photos && setProfile({ ...profile, photos: [...profile.photos, res2.data] });
        }

        const src = URL.createObjectURL(e.target.files[0]);
        setAvatar(src);
      }
      e.target.value = "";
      toast.success("Photo uploaded successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!photo?.id) return;
    try {
      if (profile?.photos && profile?.photos?.length <= 3) {
        toast.error("You must have at least 3 photos");
        return;
      }

      setLoading(true);

      await deletePhotoMutationAsync(photo?.id);
      setProfile({ ...profile, photos: profile?.photos?.filter((p) => p?.id !== photo?.id) });
      setAvatar(null);
      toast.success("Image removed");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { inputRef, avatar, loading, handleInputClick, handleInputFileChange, handleRemoveImage };
};

export default useUserPhotoInput;
