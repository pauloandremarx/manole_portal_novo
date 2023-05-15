"use client";

import styles from "./formPerfil.module.css";
import React, { useEffect, useState, useRef } from "react";
import { getLocalStorage } from "@/util/Helpers";
import { SelectInstituicao, SelectTipoFormacao,
} from "@/components/Manole/FormElements";
import {atualizarPerfilAcademic, atualizarPerfil} from "@/services/atualizarPerfil/useAtualizarPerfil";
import Swal from "sweetalert2";
import { useQuery, useQueries, usersQuery } from "@tanstack/react-query";

import { usePathname, useRouter } from "next/navigation";
import Config from "@/util/Config";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from 'react-select';