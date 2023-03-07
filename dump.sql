PGDMP                         {            linkr #   14.7 (Ubuntu 14.7-0ubuntu0.22.10.1) #   14.7 (Ubuntu 14.7-0ubuntu0.22.10.1) 6    g           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            h           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            i           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            j           1262    17069    linkr    DATABASE     Z   CREATE DATABASE linkr WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE linkr;
                postgres    false            �            1259    17114    hashtag    TABLE     �   CREATE TABLE public.hashtag (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2023-03-07 18:30:50.223755'::timestamp without time zone NOT NULL,
    name text NOT NULL
);
    DROP TABLE public.hashtag;
       public         heap    postgres    false            �            1259    17124    hashtagPost    TABLE     �   CREATE TABLE public."hashtagPost" (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2023-03-07 18:30:50.223755'::timestamp without time zone NOT NULL,
    "postId" integer NOT NULL,
    "hashtagId" integer NOT NULL
);
 !   DROP TABLE public."hashtagPost";
       public         heap    postgres    false            �            1259    17123    hashtagPost_id_seq    SEQUENCE     �   CREATE SEQUENCE public."hashtagPost_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."hashtagPost_id_seq";
       public          postgres    false    220            k           0    0    hashtagPost_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."hashtagPost_id_seq" OWNED BY public."hashtagPost".id;
          public          postgres    false    219            �            1259    17113    hashtag_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hashtag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.hashtag_id_seq;
       public          postgres    false    218            l           0    0    hashtag_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.hashtag_id_seq OWNED BY public.hashtag.id;
          public          postgres    false    217            �            1259    17106    likes    TABLE     �   CREATE TABLE public.likes (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2023-03-07 18:30:50.223755'::timestamp without time zone NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL
);
    DROP TABLE public.likes;
       public         heap    postgres    false            �            1259    17105    likes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.likes_id_seq;
       public          postgres    false    216            m           0    0    likes_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;
          public          postgres    false    215            �            1259    17096    posts    TABLE     �   CREATE TABLE public.posts (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2023-03-07 18:30:50.223755'::timestamp without time zone NOT NULL,
    "userId" integer NOT NULL,
    description text,
    url text NOT NULL
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    17095    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          postgres    false    214            n           0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          postgres    false    213            �            1259    17086    session    TABLE     �   CREATE TABLE public.session (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2023-03-07 18:30:50.223755'::timestamp without time zone NOT NULL
);
    DROP TABLE public.session;
       public         heap    postgres    false            �            1259    17085    session_id_seq    SEQUENCE     �   CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.session_id_seq;
       public          postgres    false    212            o           0    0    session_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;
          public          postgres    false    211            �            1259    17071    users    TABLE     L  CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    username text NOT NULL,
    "pictureUrl" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2023-03-07 18:30:50.223755'::timestamp without time zone NOT NULL,
    blocked boolean DEFAULT false NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    17070    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    210            p           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    209            �           2604    17117 
   hashtag id    DEFAULT     h   ALTER TABLE ONLY public.hashtag ALTER COLUMN id SET DEFAULT nextval('public.hashtag_id_seq'::regclass);
 9   ALTER TABLE public.hashtag ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    17127    hashtagPost id    DEFAULT     t   ALTER TABLE ONLY public."hashtagPost" ALTER COLUMN id SET DEFAULT nextval('public."hashtagPost_id_seq"'::regclass);
 ?   ALTER TABLE public."hashtagPost" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    17109    likes id    DEFAULT     d   ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);
 7   ALTER TABLE public.likes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    17099    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            �           2604    17089 
   session id    DEFAULT     h   ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);
 9   ALTER TABLE public.session ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    17074    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            b          0    17114    hashtag 
   TABLE DATA           8   COPY public.hashtag (id, "createdAt", name) FROM stdin;
    public          postgres    false    218   6<       d          0    17124    hashtagPost 
   TABLE DATA           O   COPY public."hashtagPost" (id, "createdAt", "postId", "hashtagId") FROM stdin;
    public          postgres    false    220   S<       `          0    17106    likes 
   TABLE DATA           D   COPY public.likes (id, "createdAt", "postId", "userId") FROM stdin;
    public          postgres    false    216   p<       ^          0    17096    posts 
   TABLE DATA           L   COPY public.posts (id, "createdAt", "userId", description, url) FROM stdin;
    public          postgres    false    214   �<       \          0    17086    session 
   TABLE DATA           C   COPY public.session (id, "userId", token, "createdAt") FROM stdin;
    public          postgres    false    212   �<       Z          0    17071    users 
   TABLE DATA           b   COPY public.users (id, email, password, username, "pictureUrl", "createdAt", blocked) FROM stdin;
    public          postgres    false    210   �<       q           0    0    hashtagPost_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."hashtagPost_id_seq"', 1, false);
          public          postgres    false    219            r           0    0    hashtag_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.hashtag_id_seq', 1, false);
          public          postgres    false    217            s           0    0    likes_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.likes_id_seq', 1, false);
          public          postgres    false    215            t           0    0    posts_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.posts_id_seq', 1, false);
          public          postgres    false    213            u           0    0    session_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.session_id_seq', 1, false);
          public          postgres    false    211            v           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    209            �           2606    17130    hashtagPost hashtagPost_pk 
   CONSTRAINT     \   ALTER TABLE ONLY public."hashtagPost"
    ADD CONSTRAINT "hashtagPost_pk" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."hashtagPost" DROP CONSTRAINT "hashtagPost_pk";
       public            postgres    false    220            �           2606    17122    hashtag hashtag_pk 
   CONSTRAINT     P   ALTER TABLE ONLY public.hashtag
    ADD CONSTRAINT hashtag_pk PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.hashtag DROP CONSTRAINT hashtag_pk;
       public            postgres    false    218            �           2606    17112    likes likes_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_pk;
       public            postgres    false    216            �           2606    17104    posts posts_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pk;
       public            postgres    false    214            �           2606    17094    session session_pk 
   CONSTRAINT     P   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pk PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pk;
       public            postgres    false    212            �           2606    17082    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    210            �           2606    17080    users users_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
       public            postgres    false    210            �           2606    17084    users users_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_key;
       public            postgres    false    210            �           2606    17151    hashtagPost hashtagPost_fk0    FK CONSTRAINT        ALTER TABLE ONLY public."hashtagPost"
    ADD CONSTRAINT "hashtagPost_fk0" FOREIGN KEY ("postId") REFERENCES public.posts(id);
 I   ALTER TABLE ONLY public."hashtagPost" DROP CONSTRAINT "hashtagPost_fk0";
       public          postgres    false    3265    214    220            �           2606    17156    hashtagPost hashtagPost_fk1    FK CONSTRAINT     �   ALTER TABLE ONLY public."hashtagPost"
    ADD CONSTRAINT "hashtagPost_fk1" FOREIGN KEY ("hashtagId") REFERENCES public.hashtag(id);
 I   ALTER TABLE ONLY public."hashtagPost" DROP CONSTRAINT "hashtagPost_fk1";
       public          postgres    false    220    3269    218            �           2606    17141    likes likes_fk0    FK CONSTRAINT     o   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk0 FOREIGN KEY ("postId") REFERENCES public.posts(id);
 9   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_fk0;
       public          postgres    false    216    214    3265            �           2606    17146    likes likes_fk1    FK CONSTRAINT     o   ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk1 FOREIGN KEY ("userId") REFERENCES public.users(id);
 9   ALTER TABLE ONLY public.likes DROP CONSTRAINT likes_fk1;
       public          postgres    false    216    210    3259            �           2606    17136    posts posts_fk0    FK CONSTRAINT     o   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);
 9   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_fk0;
       public          postgres    false    210    3259    214            �           2606    17131    session session_fk0    FK CONSTRAINT     s   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);
 =   ALTER TABLE ONLY public.session DROP CONSTRAINT session_fk0;
       public          postgres    false    212    210    3259            b      x������ � �      d      x������ � �      `      x������ � �      ^      x������ � �      \      x������ � �      Z      x������ � �     