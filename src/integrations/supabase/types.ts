export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admins: {
        Row: {
          activation_key: string
          created_at: string
          email: string | null
          id: string
          last_login: string | null
          mobile_number: string
          name: string
          updated_at: string
        }
        Insert: {
          activation_key: string
          created_at?: string
          email?: string | null
          id?: string
          last_login?: string | null
          mobile_number: string
          name: string
          updated_at?: string
        }
        Update: {
          activation_key?: string
          created_at?: string
          email?: string | null
          id?: string
          last_login?: string | null
          mobile_number?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      voters: {
        Row: {
          ac_no: string | null
          age: number | null
          applicant_first_name: string | null
          applicant_first_name_l1: string | null
          applicant_full_name: string | null
          applicant_full_name_l1: string | null
          applicant_last_name: string | null
          applicant_last_name_l1: string | null
          birthday: string | null
          booth_address: string | null
          booth_address_l1: string | null
          caste: string | null
          created_at: string
          education: string | null
          epic_number: string | null
          favor_status: string | null
          gender: string | null
          house_number: string | null
          id: string
          is_dead: boolean | null
          mobile_number: string | null
          nagar: string | null
          part_no: string | null
          party_worker: string | null
          profession: string | null
          relation_full_name: string | null
          relation_full_name_l1: string | null
          relation_last_name_l1: string | null
          relation_type: string | null
          role: string | null
          section_no: string | null
          slnoinpart: string | null
          society: string | null
          survey_status: string | null
          updated_at: string
          v_address: string | null
          v_address_l1: string | null
          visited_by: string | null
          whatsapp_status: string | null
        }
        Insert: {
          ac_no?: string | null
          age?: number | null
          applicant_first_name?: string | null
          applicant_first_name_l1?: string | null
          applicant_full_name?: string | null
          applicant_full_name_l1?: string | null
          applicant_last_name?: string | null
          applicant_last_name_l1?: string | null
          birthday?: string | null
          booth_address?: string | null
          booth_address_l1?: string | null
          caste?: string | null
          created_at?: string
          education?: string | null
          epic_number?: string | null
          favor_status?: string | null
          gender?: string | null
          house_number?: string | null
          id?: string
          is_dead?: boolean | null
          mobile_number?: string | null
          nagar?: string | null
          part_no?: string | null
          party_worker?: string | null
          profession?: string | null
          relation_full_name?: string | null
          relation_full_name_l1?: string | null
          relation_last_name_l1?: string | null
          relation_type?: string | null
          role?: string | null
          section_no?: string | null
          slnoinpart?: string | null
          society?: string | null
          survey_status?: string | null
          updated_at?: string
          v_address?: string | null
          v_address_l1?: string | null
          visited_by?: string | null
          whatsapp_status?: string | null
        }
        Update: {
          ac_no?: string | null
          age?: number | null
          applicant_first_name?: string | null
          applicant_first_name_l1?: string | null
          applicant_full_name?: string | null
          applicant_full_name_l1?: string | null
          applicant_last_name?: string | null
          applicant_last_name_l1?: string | null
          birthday?: string | null
          booth_address?: string | null
          booth_address_l1?: string | null
          caste?: string | null
          created_at?: string
          education?: string | null
          epic_number?: string | null
          favor_status?: string | null
          gender?: string | null
          house_number?: string | null
          id?: string
          is_dead?: boolean | null
          mobile_number?: string | null
          nagar?: string | null
          part_no?: string | null
          party_worker?: string | null
          profession?: string | null
          relation_full_name?: string | null
          relation_full_name_l1?: string | null
          relation_last_name_l1?: string | null
          relation_type?: string | null
          role?: string | null
          section_no?: string | null
          slnoinpart?: string | null
          society?: string | null
          survey_status?: string | null
          updated_at?: string
          v_address?: string | null
          v_address_l1?: string | null
          visited_by?: string | null
          whatsapp_status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
