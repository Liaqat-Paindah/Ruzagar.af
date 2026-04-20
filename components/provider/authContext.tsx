'use client';
import { supabase } from "@/utils/supabase/supabase";
import { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  loading: boolean;
};

interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  image: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return data as Profile;
  };

  useEffect(() => {
    let isMounted = true;

    const syncAuthState = async (currentUser: User | null) => {
      if (!isMounted) {
        return;
      }

      setUser(currentUser);

      if (!currentUser) {
        setProfile(null);
        return;
      }

      const userProfile = await fetchUserProfile(currentUser.id);

      if (!isMounted) {
        return;
      }

      setProfile(userProfile);
    };

    const init = async () => {
      setLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error(error);
      }

      await syncAuthState(session?.user ?? null);

      if (isMounted) {
        setLoading(false);
      }
    };

    init();
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await syncAuthState(session?.user ?? null);

        if (isMounted) {
          setLoading(false);
        }
      },
    );

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Proper hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthProvider;
