import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useRelationshipTypesData } from "@/hooks/useRelationshipTypesData";
import { RelationshipType } from "@/types";
import { useUpdateProfileData } from "@/hooks/useUsersData";
import { DateStatusModalProps } from ".";
import { useAuthStore } from "@/store";

const useDateStatusModal = (props: DateStatusModalProps) => {
  const { setOpen } = props;

  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);

  const { data: res } = useRelationshipTypesData();
  const { mutateAsync } = useUpdateProfileData();

  const [relationshipTypeSelected, setRelationshipTypeSelected] = useState<RelationshipType | null>(
    profile?.relationshipType || null,
  );
  const [loading, setLoading] = useState(false);

  const relationshipTypes = useMemo(() => (res?.data ?? []) as RelationshipType[], [res?.data]);

  const handleChangeRelationshipType = useCallback(
    (relationshipType: RelationshipType) => () => {
      setRelationshipTypeSelected(relationshipType);
    },
    [],
  );

  const handleSubmit = async () => {
    if (!relationshipTypeSelected?.id) return;
    try {
      setLoading(true);
      const { data: res } = await mutateAsync({ relationshipType: relationshipTypeSelected.id });
      setProfile(res.data);
      toast.success("Relationship type updated successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (relationshipTypes.length > 0 && !profile?.relationshipType) {
      setRelationshipTypeSelected(
        relationshipTypes.find((relationshipType) => relationshipType.isDefault) ?? null,
      );
    }
  }, [relationshipTypes]);

  return {
    loading,
    relationshipTypes,
    relationshipTypeSelected,
    handleChangeRelationshipType,
    handleSubmit,
  };
};

export default useDateStatusModal;
