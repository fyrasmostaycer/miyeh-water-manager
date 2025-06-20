export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string | null
          id: string
          message: string
          message_ar: string | null
          organization_id: string
          read_status: boolean | null
          severity: Database["public"]["Enums"]["alert_severity"] | null
          title: string
          title_ar: string | null
          type: Database["public"]["Enums"]["alert_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          message_ar?: string | null
          organization_id: string
          read_status?: boolean | null
          severity?: Database["public"]["Enums"]["alert_severity"] | null
          title: string
          title_ar?: string | null
          type: Database["public"]["Enums"]["alert_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          message_ar?: string | null
          organization_id?: string
          read_status?: boolean | null
          severity?: Database["public"]["Enums"]["alert_severity"] | null
          title?: string
          title_ar?: string | null
          type?: Database["public"]["Enums"]["alert_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bills: {
        Row: {
          amount: number
          consumption: number
          due_date: string
          generated_at: string | null
          id: string
          notes: string | null
          paid_at: string | null
          period_end: string
          period_start: string
          status: Database["public"]["Enums"]["bill_status"] | null
          subscriber_id: string
        }
        Insert: {
          amount: number
          consumption?: number
          due_date: string
          generated_at?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          period_end: string
          period_start: string
          status?: Database["public"]["Enums"]["bill_status"] | null
          subscriber_id: string
        }
        Update: {
          amount?: number
          consumption?: number
          due_date?: string
          generated_at?: string | null
          id?: string
          notes?: string | null
          paid_at?: string | null
          period_end?: string
          period_start?: string
          status?: Database["public"]["Enums"]["bill_status"] | null
          subscriber_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bills_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          approved_by: string | null
          category: string
          created_at: string | null
          description: string
          description_ar: string | null
          expense_date: string
          id: string
          notes: string | null
          organization_id: string
          receipt_url: string | null
        }
        Insert: {
          amount: number
          approved_by?: string | null
          category: string
          created_at?: string | null
          description: string
          description_ar?: string | null
          expense_date?: string
          id?: string
          notes?: string | null
          organization_id: string
          receipt_url?: string | null
        }
        Update: {
          amount?: number
          approved_by?: string | null
          category?: string
          created_at?: string | null
          description?: string
          description_ar?: string | null
          expense_date?: string
          id?: string
          notes?: string | null
          organization_id?: string
          receipt_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      meter_readings: {
        Row: {
          consumption: number | null
          created_at: string | null
          current_reading: number
          id: string
          notes: string | null
          photo_url: string | null
          previous_reading: number | null
          reader_name: string | null
          reading_date: string
          subscriber_id: string
        }
        Insert: {
          consumption?: number | null
          created_at?: string | null
          current_reading: number
          id?: string
          notes?: string | null
          photo_url?: string | null
          previous_reading?: number | null
          reader_name?: string | null
          reading_date?: string
          subscriber_id: string
        }
        Update: {
          consumption?: number | null
          created_at?: string | null
          current_reading?: number
          id?: string
          notes?: string | null
          photo_url?: string | null
          previous_reading?: number | null
          reader_name?: string | null
          reading_date?: string
          subscriber_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meter_readings_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string
          city: string
          created_at: string | null
          email: string | null
          id: string
          name: string
          name_ar: string | null
          phone: string | null
          region: string | null
          settings: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          name_ar?: string | null
          phone?: string | null
          region?: string | null
          settings?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          name_ar?: string | null
          phone?: string | null
          region?: string | null
          settings?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          bill_id: string | null
          collector_name: string | null
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          receipt_number: string | null
          subscriber_id: string
        }
        Insert: {
          amount: number
          bill_id?: string | null
          collector_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          receipt_number?: string | null
          subscriber_id: string
        }
        Update: {
          amount?: number
          bill_id?: string | null
          collector_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          receipt_number?: string | null
          subscriber_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_bill_id_fkey"
            columns: ["bill_id"]
            isOneToOne: false
            referencedRelation: "bills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_subscriber_id_fkey"
            columns: ["subscriber_id"]
            isOneToOne: false
            referencedRelation: "subscribers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          last_login: string | null
          organization_id: string | null
          permissions: Json | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id: string
          last_login?: string | null
          organization_id?: string | null
          permissions?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          last_login?: string | null
          organization_id?: string | null
          permissions?: Json | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          id: string
          key: string
          organization_id: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          organization_id: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          id?: string
          key?: string
          organization_id?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "settings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscribers: {
        Row: {
          address: string
          address_ar: string | null
          connection_date: string | null
          created_at: string | null
          family_size: number | null
          id: string
          meter_number: string
          name: string
          name_ar: string | null
          notes: string | null
          organization_id: string
          phone: string | null
          status: Database["public"]["Enums"]["subscriber_status"] | null
          tariff_type: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          address_ar?: string | null
          connection_date?: string | null
          created_at?: string | null
          family_size?: number | null
          id?: string
          meter_number: string
          name: string
          name_ar?: string | null
          notes?: string | null
          organization_id: string
          phone?: string | null
          status?: Database["public"]["Enums"]["subscriber_status"] | null
          tariff_type?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          address_ar?: string | null
          connection_date?: string | null
          created_at?: string | null
          family_size?: number | null
          id?: string
          meter_number?: string
          name?: string
          name_ar?: string | null
          notes?: string | null
          organization_id?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["subscriber_status"] | null
          tariff_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscribers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      alert_severity: "low" | "medium" | "high" | "critical"
      alert_type:
        | "overdue_payment"
        | "high_consumption"
        | "system_maintenance"
        | "new_subscriber"
        | "payment_confirmation"
      bill_status: "pending" | "paid" | "overdue" | "cancelled"
      payment_method: "cash" | "bank_transfer" | "mobile_money" | "check"
      subscriber_status: "active" | "inactive" | "suspended"
      user_role:
        | "super_admin"
        | "admin"
        | "treasurer"
        | "secretary"
        | "reader"
        | "member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["low", "medium", "high", "critical"],
      alert_type: [
        "overdue_payment",
        "high_consumption",
        "system_maintenance",
        "new_subscriber",
        "payment_confirmation",
      ],
      bill_status: ["pending", "paid", "overdue", "cancelled"],
      payment_method: ["cash", "bank_transfer", "mobile_money", "check"],
      subscriber_status: ["active", "inactive", "suspended"],
      user_role: [
        "super_admin",
        "admin",
        "treasurer",
        "secretary",
        "reader",
        "member",
      ],
    },
  },
} as const
